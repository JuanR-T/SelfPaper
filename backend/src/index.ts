require('dotenv').config();
import express from 'express';
import { publicationRoutes } from './routes/PublicationRoutes';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    }),
);
//TODO insert cors package
//TODO make a sharp package middleware to handle global image resizing.

app.use('/api/publication', publicationRoutes());

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log('Node API is running on port', PORT);
        });
    })
    .catch((error: Error) => {
        console.log('There is an error connecting to MongoDB: ', error);
    });
