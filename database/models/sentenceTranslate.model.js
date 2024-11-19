import { model, Schema } from "mongoose";

const sentencesTranslateSchema = new Schema(
  {
    sentenceEnglish: {
      type: String,
      required: [true, "English sentence is required"],
      minLength: [2, "English sentence is too short"],
      maxLength: [255, "English sentence is too long"],
      trim: true,
    },
    sentenceArabic: {
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

const SentencesTranslate = model(
  "SentencesTranslate",
  sentencesTranslateSchema
);

export default SentencesTranslate;
