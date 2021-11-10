import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import AuthRouter from './routers/auth_router.js';
import errorMiddleware from './middlewares/error_middleware.js';

// Конфигурация переменных среды.
dotenv.config();

// Достаем порт, на котором запустить сервер.
const port = process.env.PORT || 443;

// Ссылка на подключение к базе данных.
const databaseUrl = process.env.DB_URL;

const app = express();

app.use(express.json());

// Routers.
app.use('/rest-api/auth', AuthRouter);

// Middleware. ДОЛЖНЫ БЫТЬ ПОСЛЕ ВСЕХ app.use.
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.status(200).json('Treearth backend!');
})

async function startApp() {
    try {
        await mongoose.connect(databaseUrl);
        app.listen(port, () => console.log('Server is listening on port: %d', port));
    } catch (e) {
        console.log(e);
    }
}

/// Starting server.
startApp();

