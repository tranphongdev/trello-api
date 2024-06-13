import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { boardValidation } from '~/validations/boardValidation';

const Router = express.Router();

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'GET: APIs v1 get list board.' });
    })
    .post(boardValidation.createNew);

export const boardRoute = Router;
