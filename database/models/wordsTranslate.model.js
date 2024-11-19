import { model, Schema } from "mongoose";

const wordsTranslateSchema = new Schema(
  {
    wordEnglish: {
      type: String,
      required: [true, "English word is required"],
      minLength: [2, "English word is too short"],
      maxLength: [20, "English word is too long"],
      trim: true,
    },
    wordArabic: {
      type: String,
      // required: [true, "Arabic word is required"],
      // minLength: [2, "Arabic word is too short"],
      // maxLength: [20, "Arabic word is too long"],
      trim: true,
    },
    description: {
      type: String,

      trim: true,
    },
    isArabicVisible: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, versionKey: false }
);

const WordsTranslate = model("WordsTranslate", wordsTranslateSchema);

export default WordsTranslate;
