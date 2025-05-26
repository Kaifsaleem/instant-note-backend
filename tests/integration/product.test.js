const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Product = require('../../models/product');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config');

let adminToken;
let userToken;
let testProductId;

beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.TEST_DB_URI || 'mongodb://localhost:27017/test-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    // Create test admin user
    const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'Password123',
        role: 'admin'
    });

    // Create test regular user
    const regularUser = await User.create({
        name: 'Regular User',
        email: 'user@test.com',
        password: 'Password123',
        role: 'user'
    });

    // Generate tokens
    adminToken = jwt.sign({ id: adminUser._id }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });

    userToken = jwt.sign({ id: regularUser._id }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });

    // Create a test product
    const testProduct = await Product.create({
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        category: 'electronics'
    });

    testProductId = testProduct._id;
});

afterAll(async () => {
    // Clean up database
    await Product.deleteMany({});
    await User.deleteMany({});

    // Close database connection
    await mongoose.connection.close();
});

describe('Product API', () => {
    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const res = await request(app)
                .get('/api/products')
                .expect(200);

            expect(res.body.status).toBe('success');
            expect(Array.isArray(res.body.data.products)).toBeTruthy();
            expect(res.body.data.products.length).toBeGreaterThan(0);
        });

        it('should filter products by category', async () => {
            const res = await request(app)
                .get('/api/products?category=electronics')
                .expect(200);

            expect(res.body.status).toBe('success');
            expect(Array.isArray(res.body.data.products)).toBeTruthy();
            expect(res.body.data.products.every(product => product.category === 'electronics')).toBeTruthy();
        });
    });

    describe('GET /api/products/:id', () => {
        it('should return a product by id', async () => {
            const res = await request(app)
                .get(`/api/products/${testProductId}`)
                .expect(200);

            expect(res.body.status).toBe('success');
            expect(res.body.data.product.name).toBe('Test Product');
            expect(res.body.data.product.price).toBe(99.99);
        });

        it('should return 404 for non-existent product id', async () => {
            const res = await request(app)
                .get(`/api/products/5f7d0c48c9b1f8a9c0f8c0f8`)
                .expect(404);

            expect(res.body.status).toBe('fail');
        });
    });

    describe('POST /api/products', () => {
        it('should create a new product when authenticated as admin', async () => {
            const newProduct = {
                name: 'New Test Product',
                description: 'This is a new test product',
                price: 149.99,
                category: 'electronics'
            };

            const res = await request(app)
                .post('/api/products')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newProduct)
                .expect(201);

            expect(res.body.status).toBe('success');
            expect(res.body.data.product.name).toBe(newProduct.name);
            expect(res.body.data.product.price).toBe(newProduct.price);
        });

        it('should reject product creation for non-admin users', async () => {
            const newProduct = {
                name: 'Another Test Product',
                description: 'This product should not be created',
                price: 199.99,
                category: 'electronics'
            };

            await request(app)
                .post('/api/products')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newProduct)
                .expect(403);
        });
    });

    describe('PATCH /api/products/:id', () => {
        it('should update a product when authenticated as admin', async () => {
            const updates = {
                name: 'Updated Test Product',
                price: 129.99
            };

            const res = await request(app)
                .patch(`/api/products/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updates)
                .expect(200);

            expect(res.body.status).toBe('success');
            expect(res.body.data.product.name).toBe(updates.name);
            expect(res.body.data.product.price).toBe(updates.price);
        });

        it('should reject product update for non-admin users', async () => {
            const updates = {
                name: 'Unauthorized Update',
                price: 89.99
            };

            await request(app)
                .patch(`/api/products/${testProductId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(updates)
                .expect(403);
        });
    });

    describe('DELETE /api/products/:id', () => {
        it('should reject product deletion for non-admin users', async () => {
            await request(app)
                .delete(`/api/products/${testProductId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);
        });

        it('should delete a product when authenticated as admin', async () => {
            await request(app)
                .delete(`/api/products/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(204);

            // Verify the product is deleted
            await request(app)
                .get(`/api/products/${testProductId}`)
                .expect(404);
        });
    });
});