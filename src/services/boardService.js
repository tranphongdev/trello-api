/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError';
import { slugify } from '~/utils/formatters';

const createNew = async (reqBody) => {
    try {
        // Xử lý logic dữ liệu
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        };

        // Trả kết quả về, trong Service luôn phải có return
        return newBoard;
    } catch (error) {
        throw error;
    }
};

export const boardService = {
    createNew,
};
