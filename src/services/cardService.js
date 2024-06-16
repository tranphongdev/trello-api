import { cardModel } from '~/models/cardModel';
import { columnModel } from '~/models/columnModel';

const createNew = async (reqBody) => {
    try {
        // Xử lý logic dữ liệu
        const newCard = {
            ...reqBody,
        };
        const createdCard = await cardModel.createNew(newCard);
        const getNewCard = await cardModel.findOneById(createdCard.insertedId);

        if (getNewCard) {
            await columnModel.pushCardOrderIds(getNewCard);
        }

        // Trả kết quả về, trong Service luôn phải có return
        return getNewCard;
    } catch (error) {
        throw error;
    }
};

export const cardService = {
    createNew,
};
