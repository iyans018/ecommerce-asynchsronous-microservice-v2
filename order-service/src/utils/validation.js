import Joi from "joi";

const validateOrder = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    shippingType: Joi.string().required(),
    shippingCost: Joi.number().required(),
    amount: Joi.number().required(),
    shippingAddress: Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      postalCode: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    }).required(),
    products: Joi.array().required(),
    status: Joi.number().required(),
    cart: Joi.string().required(),
  });

  return schema.validate(data);
}

export { validateOrder };