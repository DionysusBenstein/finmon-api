import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    info: {
      title: 'Finmon API',
      version: '1.0.0',
      description: 'tupa api',
      contact: {
        name: 'Benstein'
      }
    },
    servers: [
      {
        url: 'http://localhost:8081'
      }
    ],
  },
  // apis: ['./routes/*.js']
  apis: ['./index.js']
};

const specs = swaggerJsDoc(options);

// Routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */

export { swaggerUi, specs };