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

export const columnService = {
    createNew,
};
