/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel';
import { slugify } from '~/utils/formatters';

const createNew = async (reqBody) => {
    try {
        // Xử lý logic dữ liệu
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        };

        const createdBoard = await boardModel.createNew(newBoard);
        console.log(createdBoard);

        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
        console.log(getNewBoard);

        // Trả kết quả về, trong Service luôn phải có return
        return getNewBoard;
    } catch (error) {
        throw error;
    }
};

export const boardService = {
    createNew,
};
