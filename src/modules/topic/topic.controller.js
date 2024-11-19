import TopicModel from "../../../database/models/topic.model.js";
import AppError from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";

const addTopic = async (req, res, next) => {
  const { topic, title } = req.body;

  const topicEntry = new TopicModel({
    topic,
    title,
  });

  const createdTopic = await topicEntry.save();

  return res.status(200).json({
    message: messages.topic.successCreate,
    topic: createdTopic,
    success: true,
  });
};

const updateTopic = async (req, res, next) => {
  const { id } = req.params;
  const { topic, title } = req.body;

  const updatedTopic = await TopicModel.findByIdAndUpdate(
    id,
    { topic, title },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedTopic) {
    return next(new AppError(messages.topic.notFound, 404));
  }

  return res.status(200).json({
    message: messages.topic.successUpdate,
    topic: updatedTopic,
    success: true,
  });
};

const deleteTopic = async (req, res, next) => {
  const { id } = req.params;

  const deletedTopic = await TopicModel.findByIdAndDelete(id);

  if (!deletedTopic) {
    return next(new AppError(messages.topic.notFound, 404));
  }

  return res.status(200).json({
    message: messages.topic.successDelete,
    success: true,
  });
};

const deleteAllTopics = async (req, res, next) => {
  await TopicModel.deleteMany({});

  return res.status(200).json({
    message: messages.topic.successDeleteAll,
    success: true,
  });
};

const getTopic = async (req, res, next) => {
  const { id } = req.params;

  const topic = await TopicModel.findById(id);

  if (!topic) {
    return next(new AppError(messages.topic.notFound, 404));
  }

  return res.status(200).json({
    message: messages.topic.success,
    topic,
    success: true,
  });
};

const getAllTopics = async (req, res, next) => {
  const topics = await TopicModel.find();

  return res.status(200).json({
    message: messages.topic.success,
    topics,
    success: true,
  });
};

export {
  addTopic,
  deleteAllTopics,
  deleteTopic,
  getAllTopics,
  getTopic,
  updateTopic,
};
