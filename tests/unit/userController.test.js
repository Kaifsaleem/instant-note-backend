const request = require('supertest');
const app = require('../../app');

describe('User API', () => {
    describe('POST /api/users/signup', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'Password123'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('status', 'success');
            expect(res.body).toHaveProperty('token');
            expect(res.body.data.user).toHaveProperty('name', 'Test User');
            expect(res.body.data.user).toHaveProperty('email', 'test@example.com');
        });
    });
});
