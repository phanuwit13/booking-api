import Joi from "joi";
import { UserRequest } from "../model/user-model";

export const loginValidation = (data: UserRequest) => {
    const schema = Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().min(5).required(),
    });

    return schema.validate(data);
};