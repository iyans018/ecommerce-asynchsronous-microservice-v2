import Joi from "joi";

const validatePayment = (data) => {
  const schema = Joi.object({
    order: Joi.string().required(),
    amount: Joi.number().required(),
    method: Joi.string().required(),
  });

  return schema.validate(data);
}

export { validatePayment };