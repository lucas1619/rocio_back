import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import locationRoutes from './routes/location.js';
import fieldRoutes from './routes/field.js';
import cropRoutes from './routes/crop.js';
import irrigationRoutes from './routes/irrigation.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'; 

import http from 'http';

import { WebSocketServer } from 'ws'




const app = express();
const server = http.createServer(app);


const wss = new WebSocketServer({ server: server });
wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.event === 'measureFromIot') {
      // enviar a todos los clientes conectados menos al que envió el mensaje
      wss.clients.forEach((client) => {
        if (client !== ws) {
          client.send(JSON.stringify({
            event: 'updateMeasureFromIot',
            data: message.data
          }));
        }
      });
    }
  });
});

// Permitir todas las conexiones
wss.on('headers', (headers, req) => {
  headers.push('Access-Control-Allow-Origin: *');
  headers.push('Access-Control-Allow-Headers: Content-Type');
});



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
app.use('/field', fieldRoutes);
app.use('/crop', cropRoutes);
app.use('/irrigation', irrigationRoutes);

app.get('/', (req, res) => {
  const data = {
    message: '¡Hola, mundo!'
  };
  res.json(data);
});


server.listen(3000, () => {
  console.log('API iniciada en el puerto 3000');
});
