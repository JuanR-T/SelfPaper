require('dotenv').config();

import express, { Request, Response } from 'express';

const app = express();
const mongoose = require('mongoose');

app.get('/', (req: Request, res: Response) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req: Request, res: Response) => {
    res.send('This is Blog route');
});

app.listen(3000, () => {
    console.log('Node API is running on port 3000');
});

mongoose
    .connect(
        `mongodb+srv://${process.env.ADMIN_API_USERNAME}:${process.env.ADMIN_API_PASSWORD}@selfpaperapi.bm5qfab.mongodb.net/SelfPaperAPI?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error: Error) => {
        console.log('There is an error connecting to MongoDB: ', error);
    });
