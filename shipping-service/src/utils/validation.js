import Joi from "joi";

const validateShipping = (data) => {
  const schema = Joi.object({
    order: Joi.string().required(),
    type: Joi.string().required(),
    cost: Joi.number().required(),
    address: Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      postalCode: Joi.number().required(),
      phoneNumber: Joi.string().required(),
    }).required(),
  });

  return schema.validate(data);
}

const validateStatusShipping = (data) => {
  const schema = Joi.object({
    status: Joi.number().required(),
  });

  return schema.validate(data);
}

export { validateShipping, validateStatusShipping };