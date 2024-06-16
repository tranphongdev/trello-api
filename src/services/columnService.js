import { columnModel } from '~/models/columnModel';
import { boardModel } from '~/models/boardModel';
import { cardModel } from '~/models/cardModel';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (reqBody) => {
    try {
        // Xử lý logic dữ liệu
        const newColumn = {
            ...reqBody,
        };
        const createdColumn = await columnModel.createNew(newColumn);
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId);

        if (getNewColumn) {
            getNewColumn.cards = [];

            await boardModel.pushColumnOrderIds(getNewColumn);
        }

        // Trả kết quả về, trong Service luôn phải có return
        return getNewColumn;
    } catch (error) {
        throw error;
    }
};

const update = async (columnId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updatedAt: Date.now(),
        };
        const updatedColumn = await columnModel.update(columnId, updateData);

        return updatedColumn;
    } catch (error) {
        throw error;
    }
};

const deleteItem = async (columnId) => {
    try {
        const targetColumn = await columnModel.findOneById(columnId);
        console.log('🚀 ~ deleteItem ~ targetColumn:', targetColumn);

        if (!targetColumn) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Column Not Found!');
        }
        // Xoá column
        await columnModel.deleteOneById(columnId);

        // Xoá toàn bộ card thuộc column trên
        await cardModel.deleteManyByColumnId(columnId);

        // Xoá columnId trong mảng columnOrderIds
        await boardModel.pullColumnOrderIds(targetColumn);

        return { deleteResult: 'Columns deleted successfully!' };
    } catch (error) {
        throw error;
    }
};

export const columnService = {
    createNew,
    update,
    deleteItem,
};
