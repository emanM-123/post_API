import { celebrate, Joi } from "celebrate";
export const updatePost = celebrate({
  body: Joi.object({
    post_id: Joi.string().hex().length(24).required(),
    title: Joi.string(),
    body: Joi.string(),
  }),
});
