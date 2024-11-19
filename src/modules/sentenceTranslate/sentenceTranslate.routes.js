import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import { validation } from "../../middleware/validation.js";
import {
  addSentence,
  deleteAllSentences,
  deleteSentence,
  getAllSentences,
  getSentence,
  updateSentence,
} from "./sentenceTranslate.controller.js";
import {
  addSentenceValidation,
  updateSentenceValidation,
} from "./sentenceTranslate.validation.js";

const sentenceRouter = Router();

/* ============== Add Sentence =============== */
sentenceRouter.post(
  "/",
  validation(addSentenceValidation),
  catchError(addSentence)
);

/* ============== Update Sentence =============== */
sentenceRouter.put(
  "/:id",
  validation(updateSentenceValidation),
  catchError(updateSentence)
);

/* ============== Delete Sentence =============== */
sentenceRouter.delete("/:id", catchError(deleteSentence));

/* ============= Delete All Sentences =============== */
sentenceRouter.delete("/", catchError(deleteAllSentences));

/* ============== Get All Sentences =============== */
sentenceRouter.get("/", catchError(getAllSentences));

/* ============== Get Sentence =============== */
sentenceRouter.get("/:id", catchError(getSentence));

export default sentenceRouter;
