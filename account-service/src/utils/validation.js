import Joi from 'joi';

const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    gender: Joi.string().required(),
  });

  return schema.validate(data);
}

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
}

const validateRefreshToken = (data) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  });

  return schema.validate(data);
}

const validateChangePassword = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required().min(6),
    newPassword: Joi.string().required().min(6),
    newPasswordConfirmation: Joi.any().equal(Joi.ref('newPassword'))
      .required()
      .label('Password confirmation')
      .options({ messages: { 'any.only': '{{#label}} does not match'} })
  });

  return schema.validate(data);
}

const validateForgotPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });

  return schema.validate(data);
}

const validateResetPassword = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(30).required(),
    passwordConfirmation: Joi.any().equal(Joi.ref('password'))
      .required()
      .label('Password confirmation')
      .options({ messages: { 'any.only': '{{#label}} does not match'} })
  });

  return schema.validate(data); 
}

const validateAddress = (data) => {
  const schema = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.number().required(),
    phoneNumber: Joi.string().required()
  });

  return schema.validate(data);
}

export {
  validateUser,
  validateLogin,
  validateRefreshToken,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
  validateAddress
}