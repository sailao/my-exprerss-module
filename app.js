import express from 'express';
import dotenv from 'dotenv';
import router from './router.mjs';
import path from 'path';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    router(app);
    app.listen(port, _=>console.log('app is starting on '+port));