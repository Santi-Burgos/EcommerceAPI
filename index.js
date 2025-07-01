import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import router from './src/routes/router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();


app.use(
    express.json(),
    cookieParser(),
    express.urlencoded({ extended: true })
);

app.use('/api', router)

const server = http.createServer(app)


server.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT)
    console.log(`Servidor corriendo en el puerto http://localhost:${process.env.PORT}`);
})