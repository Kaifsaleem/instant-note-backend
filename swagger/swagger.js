const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Post Creator API',
            version: '1.0.0',
            description: 'API documentation for the Post Creator Backend',
            contact: {
                name: 'Abuzar Ibrahim or Kaif Saleem for any Api issues',
                email: 'kabirsaleem7262@gmail.com'
            }
        },
        servers: [
            {
                url: '/api',
                description: 'API v1'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [
        './routes/*.js',
        './models/*.js',
        './swagger/definitions.js'
    ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Setup Swagger in Express app
 * @param {object} app - Express app
 */
const setupSwagger = (app) => {
    // Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log('Swagger documentation available at /api-docs');
};

module.exports = { setupSwagger };
