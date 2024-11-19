import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import { validation } from "../../middleware/validation.js";
import {
  addWord,
  deleteAllWords,
  deleteWord,
  getAllWords,
  getWord,
  updateWord,
} from "./wordsTranslate.controller.js";
import {
  addWordValidation,
  updateWordValidation,
} from "./wordsTranslate.validation.js";

const wordRouter = Router();

/* ============== Add Word =============== */
wordRouter.post("/", validation(addWordValidation), catchError(addWord));

/* ============== Update Word =============== */
wordRouter.put(
  "/:id",
  validation(updateWordValidation),
  catchError(updateWord)
);

/* ============== Delete Word =============== */
wordRouter.delete("/:id", catchError(deleteWord));

/* ============= Delete All Words =============== */
wordRouter.delete("/", catchError(deleteAllWords));

/* ============== Get All Words =============== */
wordRouter.get("/", catchError(getAllWords));

/* ============== Get Word =============== */
wordRouter.get("/:id", catchError(getWord));

export default wordRouter;
