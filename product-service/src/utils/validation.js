import Joi from "joi";

const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).required(),
    stock: Joi.number().required(),
  });

  return schema.validate(data);
}

export { validateProduct };