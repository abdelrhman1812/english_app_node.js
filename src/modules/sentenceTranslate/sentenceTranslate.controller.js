import SentencesTranslate from "../../../database/models/sentenceTranslate.model.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";

/* =============== Add Sentence =============== */
const addSentence = async (req, res, next) => {
  const { sentenceEnglish, sentenceArabic, description } = req.body;

  const sentence = new SentencesTranslate({
    sentenceEnglish,
    sentenceArabic,
    description,
  });

  const createdSentence = await sentence.save();

  return res.status(200).json({
    message: messages.sentence.successCreate,
    sentence: createdSentence,
    success: true,
  });
};

/* =============== Update Sentence =============== */
const updateSentence = async (req, res, next) => {
  const { id } = req.params;
  const { sentenceEnglish, sentenceArabic, description } = req.body;

  const updatedSentence = await SentencesTranslate.findByIdAndUpdate(
    id,
    { sentenceEnglish, sentenceArabic, description },
    { new: true, runValidators: true }
  );

  if (!updatedSentence) {
    return next(new AppError(messages.sentence.notFound, 404));
  }

  return res.status(200).json({
    message: messages.sentence.successUpdate,
    sentence: updatedSentence,
    success: true,
  });
};

/* =============== Delete Sentence =============== */
const deleteSentence = async (req, res, next) => {
  const { id } = req.params;

  const deletedSentence = await SentencesTranslate.findByIdAndDelete(id);

  if (!deletedSentence) {
    return next(new AppError(messages.sentence.notFound, 404));
  }

  return res.status(200).json({
    message: messages.sentence.successDelete,
    success: true,
  });
};

/* =============== Delete All Sentences =============== */
const deleteAllSentences = async (req, res, next) => {
  await SentencesTranslate.deleteMany({});

  return res.status(200).json({
    message: messages.sentence.successDeleteAll,
    success: true,
  });
};

/* =============== Get Sentence =============== */
const getSentence = async (req, res, next) => {
  const { id } = req.params;

  const sentence = await SentencesTranslate.findById(id);

  if (!sentence) {
    return next(new AppError(messages.sentence.notFound, 404));
  }

  return res.status(200).json({
    message: messages.sentence.success,
    sentence,
    success: true,
  });
};

/* =============== Get All Sentences =============== */
const getAllSentences = async (req, res, next) => {
  const sentences = await SentencesTranslate.find();

  return res.status(200).json({
    message: messages.sentence.success,
    sentences,
    success: true,
  });
};

export {
  addSentence,
  deleteAllSentences,
  deleteSentence,
  getAllSentences,
  getSentence,
  updateSentence,
};
