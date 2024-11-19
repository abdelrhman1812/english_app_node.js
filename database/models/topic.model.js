import { model, Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title  is required"],
      minLength: [2, "title  is too short"],
      maxLength: [20, "title  is too long"],
      trim: true,
    },
    topic: {
      type: String,
      required: [true, "topic  is required"],
      minLength: [2, "topic  is too short"],
      maxLength: [5000, "topic  is too long"],
      trim: true,
    },
    isArabicVisible: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, versionKey: false }
);

const TopicModel = model("Topic", topicSchema);

export default TopicModel;
