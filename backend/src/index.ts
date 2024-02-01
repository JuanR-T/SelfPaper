require('dotenv').config();
import express from 'express';
import { publicationRoutes } from './routes/PublicationRoutes';
import { publisherRoutes } from './routes/PublisherRoutes';
import { authorRoutes } from './routes/AuthorRoutes';
import { themeRoutes } from './routes/ThemeRoutes';

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
//TODO make a sharp package middleware to handle global image resizing.

app.use('/api/publication', publicationRoutes());
app.use('/api/publisher', publisherRoutes());
app.use('/api/author', authorRoutes());
app.use('/api/theme', themeRoutes());

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
