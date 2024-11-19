import Joi from "joi";
import customMessages from "../../utils/validationMessages.js";

const addNoteValidation = {
  body: Joi.object({
    note: Joi.string()
      .min(2)
      .max(1000)
      .required()
      .messages(customMessages("note")),
  }),
};

const updateNoteValidation = {
  body: Joi.object({
    note: Joi.string().min(2).max(1000).messages(customMessages("note")),
  }),
};

export { addNoteValidation, updateNoteValidation };
