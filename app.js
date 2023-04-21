import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import locationRoutes from './routes/location.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'; 

const app = express();
app.use(bodyParser.json());


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Documentación de mi API con Swagger'
    },
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/user', userRoutes);
app.use('/location', locationRoutes);

app.get('/', (req, res) => {
  const data = {
    message: '¡Hola, mundo!'
  };
  res.json(data);
});

app.listen(3000, () => {
  console.log('API iniciada en el puerto 3000');
});
