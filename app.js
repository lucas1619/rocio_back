import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';

const app = express();
app.use(bodyParser.json());


app.use('/user', userRoutes);

app.get('/', (req, res) => {
  const data = {
    message: '¡Hola, mundo!'
  };
  res.json(data);
});

app.listen(3000, () => {
  console.log('API iniciada en el puerto 3000');
});
