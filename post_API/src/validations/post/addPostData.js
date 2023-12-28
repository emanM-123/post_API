import { celebrate, Joi } from "celebrate";
export const addPostData = celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
});
