import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    note: {
      type: String,
      required: [true, "Note is required"],
      minLength: [2, "Note is too short"],
      maxLength: [1000, "Note is too long"],
      trim: true,
    },
    voice: {
      secure_url: String,
      public_id: String,
    },
    isArabicVisible: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, versionKey: false }
);

const NoteModel = model("Note", noteSchema);

export default NoteModel;
