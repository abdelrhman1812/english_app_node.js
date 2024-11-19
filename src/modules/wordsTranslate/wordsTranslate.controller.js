import WordsTranslate from "../../../database/models/wordsTranslate.model.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";

/* =============== Add Word =============== */
const addWord = async (req, res, next) => {
  const { wordEnglish, wordArabic, description } = req.body;

  const word = new WordsTranslate({
    wordEnglish,
    wordArabic,
    description,
  });

  const createdWord = await word.save();

  return res.status(200).json({
    message: messages.word.successCreate,
    word: createdWord,
    success: true,
  });
};

/* =============== Update Word =============== */
const updateWord = async (req, res, next) => {
  const { id } = req.params;
  const { wordEnglish, wordArabic, description } = req.body;

  const updatedWord = await WordsTranslate.findByIdAndUpdate(
    id,
    { wordEnglish, wordArabic, description },
    { new: true, runValidators: true }
  );

  if (!updatedWord) {
    return next(new AppError(messages.word.notFound, 404));
  }

  return res.status(200).json({
    message: messages.word.successUpdate,
    word: updatedWord,
    success: true,
  });
};

/* =============== Delete Word =============== */
const deleteWord = async (req, res, next) => {
  const { id } = req.params;

  const deletedWord = await WordsTranslate.findByIdAndDelete(id);

  if (!deletedWord) {
    return next(new AppError(messages.word.notFound, 404));
  }

  return res.status(200).json({
    message: messages.word.successDelete,
    success: true,
  });
};

/* =============== Delete All Words =============== */
const deleteAllWords = async (req, res, next) => {
  await WordsTranslate.deleteMany({});

  return res.status(200).json({
    message: messages.word.successDeleteAll,
    success: true,
  });
};

/* =============== Get Word =============== */
const getWord = async (req, res, next) => {
  const { id } = req.params;

  const word = await WordsTranslate.findById(id);

  if (!word) {
    return next(new AppError(messages.word.notFound, 404));
  }

  return res.status(200).json({
    message: messages.word.success,
    word,
    success: true,
  });
};

/* =============== Get All Words =============== */
const getAllWords = async (req, res, next) => {
  const words = await WordsTranslate.find();

  return res.status(200).json({
    message: messages.word.success,
    words,
    success: true,
  });
};

export {
  addWord,
  deleteAllWords,
  deleteWord,
  getAllWords,
  getWord,
  updateWord,
};
