import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { BOARD_TYPES } from '~/utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

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
        type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
    });

    try {
        // set abortEarly: false  để trường hợp có nhiều lỗi validation thì trả về tất cả
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        // Validate dữ liệu xoq chuyển hướng qua Controller
        next();
    } catch (error) {
        const errorMessage = new Error(error).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
        next(customError);
    }
};

const update = async (req, res, next) => {
    const correctCondition = Joi.object({
        // message : custom message
        title: Joi.string().min(3).max(50).trim().strict(),
        description: Joi.string().min(3).max(256).trim().strict(),
        type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
        columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),
    });

    try {
        // set abortEarly: false  để trường hợp có nhiều lỗi validation thì trả về tất cả
        await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
        next();
    } catch (error) {
        const errorMessage = new Error(error).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
        next(customError);
    }
};

const moveCardToDifferentColumn = async (req, res, next) => {
    const correctCondition = Joi.object({
        currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        prevCardOrderIds: Joi.array()
            .required()
            .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),

        nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        nextCardOrderIds: Joi.array()
            .required()
            .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),
    });

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessage = new Error(error).message;
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
        next(customError);
    }
};

export const boardValidation = {
    // Định nghĩa function nhưng không thực thi
    createNew,
    update,
    moveCardToDifferentColumn,
};
