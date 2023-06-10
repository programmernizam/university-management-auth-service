/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/', routes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
