import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import { validation } from "../../middleware/validation.js";
import multerHost from "../../services/multerHost.js";
import {
  addNote,
  deleteAllNotes,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "./note.controller.js";
import { addNoteValidation, updateNoteValidation } from "./note.validation.js";
const noteRouter = Router();

noteRouter.post(
  "/",
  multerHost().single("voice"),
  validation(addNoteValidation),
  catchError(addNote)
);

noteRouter.put(
  "/:id",
  multerHost().single("voice"),
  validation(updateNoteValidation),
  catchError(updateNote)
);

noteRouter.delete("/:id", catchError(deleteNote));

noteRouter.delete("/", catchError(deleteAllNotes));

noteRouter.get("/", catchError(getAllNotes));

noteRouter.get("/:id", catchError(getNote));

export default noteRouter;
