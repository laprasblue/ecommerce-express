import Joi from 'joi';

export const LoginAuthScheme = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .required(),
  }),
};

export const UpdateUserScheme = {
  body: Joi.object({
    password: Joi.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
    fullName: Joi.string().min(8).max(30).required(),
  }),
};
