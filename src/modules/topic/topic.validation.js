import Joi from "joi";
import customMessages from "../../utils/validationMessages.js";

const addTopicValidation = {
  body: Joi.object({
    topic: Joi.string()
      .min(2)
      .max(5000)
      .required()
      .messages(customMessages("topic")),
    title: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages(customMessages("title")),
  }),
};

const updateTopicValidation = {
  body: Joi.object({
    topic: Joi.string().min(2).max(5000).messages(customMessages("topic")),
    title: Joi.string().min(2).max(100).messages(customMessages("title")),
  }),
};

export { addTopicValidation, updateTopicValidation };
