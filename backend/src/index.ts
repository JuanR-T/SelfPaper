require('dotenv').config();
import express from 'express';
import { authorRoutes } from './routes/AuthorRoutes';
import { booksRoutes } from './routes/BooksRoutes';
import { imagesRoutes } from './routes/ImagesRoutes';
import { publicationRoutes } from './routes/PublicationRoutes';
import { publisherRoutes } from './routes/PublisherRoutes';
import { themeRoutes } from './routes/ThemeRoutes';

import cors from 'cors';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const mongoose = require('mongoose');

app.use(
    express.urlencoded({
        limit: '50mb',
        extended: false,
        parameterLimit: 50000,
    }),
);
app.use(express.text({ limit: '200mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(
    cors({
        //TODO ADD ORIGIN
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    }),
);
//TODO make a sharp package middleware to handle global image resizing.

app.use('/api/publication', publicationRoutes());
app.use('/api/publisher', publisherRoutes());
app.use('/api/author', authorRoutes());
app.use('/api/theme', themeRoutes());
app.use('/api/image', imagesRoutes());
app.use('/api/books', booksRoutes());

app.use(errorHandlingMiddleware);

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
