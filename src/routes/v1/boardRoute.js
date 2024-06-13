import express from 'express';
import { StatusCodes } from 'http-status-codes';

const Router = express.Router();

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'GET: APIs v1 get list board.' });
    })
    .post((req, res) => {
        res.status(StatusCodes.CREATED).json({ message: 'POST: APIs v1 create new board.' });
    });

export const boardRoute = Router;
