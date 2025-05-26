const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require('../../models/user');

beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.TEST_DB_URI || 'mongodb://localhost:27017/test-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
});

afterAll(async () => {
    // Clean up database
    await User.deleteMany({});

    // Close database connection
    await mongoose.connection.close();
});

beforeEach(async () => {
    // Clear users collection before each test
    await User.deleteMany({});
});

describe('Authentication API', () => {
    describe('POST /api/users/signup', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'Password123'
                })
                .expect(201);

            expect(res.body.status).toBe('success');
            expect(res.body.token).toBeDefined();
            expect(res.body.data.user).toHaveProperty('name', 'Test User');
            expect(res.body.data.user).toHaveProperty('email', 'test@example.com');
            expect(res.body.data.user).not.toHaveProperty('password');
        });

        it('should not register a user with an invalid email', async () => {
            const res = await request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Test User',
                    email: 'invalid-email',
                    password: 'Password123'
                })
                .expect(400);

            expect(res.body.status).toBe('fail');
        });

        it('should not register a user with a password less than 8 characters', async () => {
            const res = await request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'short'
                })
                .expect(400);

            expect(res.body.status).toBe('fail');
        });

        it('should not register a user with an email that already exists', async () => {
            // Create a user first
            await User.create({
                name: 'Existing User',
                email: 'existing@example.com',
                password: 'Password123'
            });

            // Try to create another user with the same email
            const res = await request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Another User',
                    email: 'existing@example.com',
                    password: 'Password123'
                })
                .expect(400);

            expect(res.body.status).toBe('fail');
        });
    });

    describe('POST /api/users/login', () => {
        it('should login an existing user', async () => {
            // Create a user
            await User.create({
                name: 'Login Test User',
                email: 'login@example.com',
                password: 'Password123'
            });

            // Login
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'login@example.com',
                    password: 'Password123'
                })
                .expect(200);

            expect(res.body.status).toBe('success');
            expect(res.body.token).toBeDefined();
            expect(res.body.data.user).toHaveProperty('name', 'Login Test User');
            expect(res.body.data.user).toHaveProperty('email', 'login@example.com');
            expect(res.body.data.user).not.toHaveProperty('password');
        });

        it('should not login with incorrect email', async () => {
            // Create a user
            await User.create({
                name: 'Login Test User',
                email: 'login@example.com',
                password: 'Password123'
            });

            // Try to login with wrong email
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'wrong@example.com',
                    password: 'Password123'
                })
                .expect(401);

            expect(res.body.status).toBe('fail');
        });

        it('should not login with incorrect password', async () => {
            // Create a user
            await User.create({
                name: 'Login Test User',
                email: 'login@example.com',
                password: 'Password123'
            });

            // Try to login with wrong password
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'login@example.com',
                    password: 'WrongPassword'
                })
                .expect(401);

            expect(res.body.status).toBe('fail');
        });
    });
});