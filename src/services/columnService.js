import { columnModel } from '~/models/columnModel';
import { boardModel } from '~/models/boardModel';

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

export const columnService = {
    createNew,
    update,
};
