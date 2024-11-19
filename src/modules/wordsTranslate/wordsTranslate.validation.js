import Joi from "joi";
import customMessages from "../../utils/validationMessages.js";

const addWordValidation = {
  body: Joi.object({
    wordEnglish: Joi.string()
      .min(1)
      .max(20)
      .required()
      .messages(customMessages("wordEnglish")),

    wordArabic: Joi.string()
      .min(1)
      .max(20)
      .optional()
      .allow("")
      .messages(customMessages("wordArabic")),

    description: Joi.string()
      .min(5)
      .max(255)
      .optional()
      .allow("")
      .messages(customMessages("description")),
  }),
};

const updateWordValidation = {
  body: Joi.object({
    wordEnglish: Joi.string()
      .min(1)
      .max(20)
      .messages(customMessages("wordEnglish")),
    wordArabic: Joi.string()
      .min(1)
      .max(20)
      .optional()
      .allow("")
      .messages(customMessages("wordArabic")),
    description: Joi.string()
      .min(5)
      .max(255)
      .optional()
      .allow("")
      .messages(customMessages("description")),
  }),
};

export { addWordValidation, updateWordValidation };
