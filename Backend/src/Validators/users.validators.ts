import joi from 'joi'
import { User } from '../Interface/user.interface';


export const registerUserSchema = joi.object<User>({
    name: joi.string().min(3).required(),
    email: joi.string().email().required().custom((value, helpers) => {
        if (!value.endsWith('@thejitu.com')) {
            return helpers.error('string.pattern.base', { value, custom: "Email must be in the format of fname.lname@thejitu.com" });
        }
        return value;
    }, 'Custom email validation'),
    password: joi.string().required(),
    role: joi.string().min(2).optional(),
    cohort: joi.number().integer().positive().required(),
    
})