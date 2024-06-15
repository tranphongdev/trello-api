/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes';
import { cloneDeep } from 'lodash';
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

        const resBoard = cloneDeep(board);
        resBoard.columns.forEach((column) => {
            column.cards = resBoard.cards.filter((card) => card.columnId.equals(column._id));
            // column.cards = resBoard.cards.filter((card) => card.columnId.toString() === column._id.toString());
        });

        delete resBoard.cards;

        return resBoard;
    } catch (error) {
        throw error;
    }
};

export const boardService = {
    createNew,
    getDetails,
};
