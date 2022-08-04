import Joi from 'joi';

export const CreateUserScheme = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .message(
        'Password must have at least 8 characters. Having 1 special character, 1 uppercase character (A-Z) and 1 digit (0-9) '
      )
      .required(),

    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    fullName: Joi.string().min(8).max(30).required(),
  }),
};

export const UpdateUserScheme = {
  body: Joi.object({
    fullName: Joi.string().min(8).max(30).required(),
  }),
  // params: Joi.object({
  //   userId: Joi.string().hex().length(24).message('Should be Object ID'),
  // }),
};

export const DisableUserScheme = {
  body: Joi.object({
    password: Joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .message(
        'password must have at least 8 characters. Having 1 special character, 1 uppercase character (A-Z) and 1 digit (0-9) '
      )
      .required(),
  }),
  // params: Joi.object({
  //   userId: Joi.string().hex().length(24).message('Should be Object ID'),
  // }),
};

export const ResetPasswordScheme = {
  body: Joi.object({
    oldPassword: Joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .message(
        'Old password must have at least 8 characters. Having 1 special character, 1 uppercase character (A-Z) and 1 digit (0-9) '
      )
      .required(),
    newPassword: Joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .message(
        'New password must have at least 8 characters. Having 1 special character, 1 uppercase character (A-Z) and 1 digit (0-9) '
      )
      .required(),
  }),
  // params: Joi.object({
  //   userId: Joi.string().hex().length(24).message('Should be Object ID'),
  // }),
};
