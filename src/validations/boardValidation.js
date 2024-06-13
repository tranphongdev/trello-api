import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        // message : custom message
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required (tranphongdev)',
            'string.empty': 'Title is not allowed to be empty (tranphongdev)',
            'string.max': 'Title length must be less than or equal to 50 characters long (tranphongdev)',
            'string.min': 'Title length must be at least 3 characters long (tranphongdev)',
            'string.trim': 'Title must not have leading or trailing whitespace (tranphongdev)',
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
    });

    try {
        console.log('req body: ', req.body);

        // set abortEarly: false  để trường hợp có nhiều lỗi validation thì trả về tất cả
        await correctCondition.validateAsync(req.body, { abortEarly: false });

        res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: APIs v1 create new board.' });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message,
        });
    }
};

export const boardValidation = {
    // Định nghĩa function nhưng không thực thi
    createNew,
};
