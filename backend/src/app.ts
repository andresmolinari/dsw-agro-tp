import Server from "./services/server";
import dotenv from 'dotenv';
import express from 'express';
import clienteRouter from './routes/cliente.routes';

// Configuramos dotenv
dotenv.config();

const server = new Server();

const app = express();
app.use(express.json());
app.use('/clientes', clienteRouter);

server.app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

export default server.app;