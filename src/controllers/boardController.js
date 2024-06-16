import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
    try {
        const createdBoard = await boardService.createNew(req.body);

        res.status(StatusCodes.CREATED).json(createdBoard);
    } catch (error) {
        next(error);
    }
};

const getDetails = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const board = await boardService.getDetails(boardId);

        res.status(StatusCodes.OK).json(board);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const updatedBoard = await boardService.update(boardId, req.body);

        res.status(StatusCodes.OK).json(updatedBoard);
    } catch (error) {
        next(error);
    }
};

const moveCardToDifferentColumn = async (req, res, next) => {
    try {
        const result = await boardService.moveCardToDifferentColumn(req.body);

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};

export const boardController = {
    // Định nghĩa function nhưng không thực thi
    createNew,
    getDetails,
    update,
    moveCardToDifferentColumn,
};
