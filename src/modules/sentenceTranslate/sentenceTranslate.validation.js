import Joi from "joi";
import customMessages from "../../utils/validationMessages.js";

const addSentenceValidation = {
  body: Joi.object({
    sentenceEnglish: Joi.string()
      .min(2)
      .max(255)
      .required()
      .messages(customMessages("sentenceEnglish")),

    sentenceArabic: Joi.string()
      .min(2)
      .max(255)
      .optional()
      .allow("")
      .messages(customMessages("sentenceArabic")),
  }),
};

const updateSentenceValidation = {
  body: Joi.object({
    sentenceEnglish: Joi.string()
      .min(2)
      .max(255)
      .messages(customMessages("sentenceEnglish")),

    sentenceArabic: Joi.string()
      .min(2)
      .max(255)
      .optional()
      .allow("")
      .messages(customMessages("sentenceArabic")),
  }),
};

export { addSentenceValidation, updateSentenceValidation };
