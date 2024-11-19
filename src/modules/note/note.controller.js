import NoteModel from "../../../database/models/note.model.js";
import AppError from "../../utils/appError.js";
import cloudinary from "../../utils/cloudinary.js";
import { messages } from "../../utils/messages.js";

const addNote = async (req, res, next) => {
  const { note } = req.body;
  let voiceFile = {};

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "English/Notes",
    });

    const { public_id, secure_url } = result;
    voiceFile = {
      secure_url,
      public_id,
    };
  }

  const noteEntry = new NoteModel({
    note,
    voice: voiceFile,
  });

  const createdNote = await noteEntry.save();

  return res.status(200).json({
    message: messages.note.successCreate,
    note: createdNote,
    success: true,
  });
};

/* ==================== Update Note ==================== */
const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { note } = req.body;

  const existingNote = await NoteModel.findById(id);
  if (!existingNote) {
    return next(new AppError(messages.note.notFound, 404));
  }

  if (req.file) {
    if (existingNote.voice && existingNote.voice.public_id) {
      const voice = await cloudinary.uploader.destroy(
        existingNote.voice.public_id,
        { resource_type: "video" }
      );
      if (voice.result !== "ok") {
        return next(new AppError("Failed to delete the old audio file.", 500));
      }
    } else {
      console.log("No previous voice file found to delete.");
    }

    // Upload the new voice file
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "English/Notes",
    });
    const { public_id, secure_url } = result;
    existingNote.voice = {
      secure_url,
      public_id,
    };
  }

  // Update the note if there's new content
  if (note) {
    existingNote.note = note;
  }

  // Save the updated note
  await existingNote.save();

  // Return a success response
  res.status(200).json({
    success: true,
    message: messages.note.successUpdate,
    note: existingNote,
  });
};

/* ==================== Delete Note ==================== */

const deleteNote = async (req, res, next) => {
  const { id } = req.params;

  const deletedNote = await NoteModel.findByIdAndDelete(id);

  if (!deletedNote) {
    return next(new AppError(messages.note.notFound, 404));
  }

  if (deletedNote.voice.public_id) {
    await cloudinary.uploader.destroy(deletedNote.voice.public_id, {
      resource_type: "video",
    });
  }

  return res.status(200).json({
    message: messages.note.successDelete,
    success: true,
  });
};

const deleteAllNotes = async (req, res, next) => {
  await NoteModel.deleteMany({});

  return res.status(200).json({
    message: messages.note.successDeleteAll,
    success: true,
  });
};

const getNote = async (req, res, next) => {
  const { id } = req.params;

  const note = await NoteModel.findById(id);

  if (!note) {
    return next(new AppError(messages.note.notFound, 404));
  }

  return res.status(200).json({
    message: messages.note.success,
    note,
    success: true,
  });
};

const getAllNotes = async (req, res, next) => {
  const notes = await NoteModel.find();

  return res.status(200).json({
    message: messages.note.success,
    notes,
    success: true,
  });
};

export {
  addNote,
  deleteAllNotes,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
};
