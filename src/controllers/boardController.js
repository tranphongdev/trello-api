import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: APIs v1 create new board.' });
    } catch (error) {
        next(error);
    }
};

export const boardController = {
    // Định nghĩa function nhưng không thực thi
    createNew,
};
