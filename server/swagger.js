import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'My API',
    description: 'Description of my API',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const endpointsFiles = ['./index.js'];

swaggerAutogen(endpointsFiles);
