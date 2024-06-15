/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { slugify } from '~/utils/formatters';

const createNew = async (reqBody) => {
    try {
        // Xử lý logic dữ liệu
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        };

        const createdBoard = await boardModel.createNew(newBoard);

        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

        // Trả kết quả về, trong Service luôn phải có return
        return getNewBoard;
    } catch (error) {
        throw error;
    }
};

const getDetails = async (boardId) => {
    try {
        const board = await boardModel.getDetails(boardId);
        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board Not Found!');
        }
        return board;
    } catch (error) {
        throw error;
    }
};

export const boardService = {
    createNew,
    getDetails,
};
