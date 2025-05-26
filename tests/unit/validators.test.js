const validators = require('../../utils/validators');

describe('Validator Utils', () => {
    describe('isValidEmail', () => {
        it('should return true for valid email addresses', () => {
            expect(validators.isValidEmail('user@example.com')).toBe(true);
            expect(validators.isValidEmail('john.doe@example.co.uk')).toBe(true);
            expect(validators.isValidEmail('user+tag@example.com')).toBe(true);
        });

        it('should return false for invalid email addresses', () => {
            expect(validators.isValidEmail('user@')).toBe(false);
            expect(validators.isValidEmail('user@example')).toBe(false);
            expect(validators.isValidEmail('userexample.com')).toBe(false);
            expect(validators.isValidEmail('user@.com')).toBe(false);
            expect(validators.isValidEmail('@example.com')).toBe(false);
            expect(validators.isValidEmail('')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should validate strong passwords', () => {
            const result = validators.validatePassword('StrongPass123');
            expect(result.isValid).toBe(true);
        });

        it('should reject passwords less than 8 characters', () => {
            const result = validators.validatePassword('Short1');
            expect(result.isValid).toBe(false);
            expect(result.message).toContain('at least 8 characters');
        });

        it('should reject passwords without uppercase letters', () => {
            const result = validators.validatePassword('lowercase123');
            expect(result.isValid).toBe(false);
            expect(result.message).toContain('uppercase letter');
        });

        it('should reject passwords without lowercase letters', () => {
            const result = validators.validatePassword('UPPERCASE123');
            expect(result.isValid).toBe(false);
            expect(result.message).toContain('lowercase letter');
        });

        it('should reject passwords without numbers', () => {
            const result = validators.validatePassword('NoNumbersHere');
            expect(result.isValid).toBe(false);
            expect(result.message).toContain('number');
        });
    });

    describe('validateProduct', () => {
        it('should validate a valid product', () => {
            const product = {
                name: 'Test Product',
                description: 'This is a test product',
                price: 99.99,
                category: 'electronics'
            };

            const result = validators.validateProduct(product);
            expect(result.isValid).toBe(true);
            expect(result.errors.length).toBe(0);
        });

        it('should reject a product without a name', () => {
            const product = {
                description: 'This is a test product',
                price: 99.99,
                category: 'electronics'
            };

            const result = validators.validateProduct(product);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Product name is required');
        });

        it('should reject a product without a description', () => {
            const product = {
                name: 'Test Product',
                price: 99.99,
                category: 'electronics'
            };

            const result = validators.validateProduct(product);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Product description is required');
        });

        it('should reject a product without a price', () => {
            const product = {
                name: 'Test Product',
                description: 'This is a test product',
                category: 'electronics'
            };

            const result = validators.validateProduct(product);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Product price is required');
        });

        it('should reject a product with a negative price', () => {
            const product = {
                name: 'Test Product',
                description: 'This is a test product',
                price: -10,
                category: 'electronics'
            };

            const result = validators.validateProduct(product);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Product price must be a positive number');
        });

        it('should reject a product with an invalid category', () => {
            const product = {
                name: 'Test Product',
                description: 'This is a test product',
                price: 99.99,
                category: 'invalid-category'
            };

            const result = validators.validateProduct(product);
            expect(result.isValid).toBe(false);
            expect(result.errors[0]).toContain('Invalid category');
        });
    });
});