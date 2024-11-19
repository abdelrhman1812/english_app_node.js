import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import { validation } from "../../middleware/validation.js";
import {
  addTopic,
  deleteAllTopics,
  deleteTopic,
  getAllTopics,
  getTopic,
  updateTopic,
} from "./topic.controller.js";
import {
  addTopicValidation,
  updateTopicValidation,
} from "./topic.validation.js";

const topicRouter = Router();

topicRouter.post("/", validation(addTopicValidation), catchError(addTopic));

topicRouter.put(
  "/:id",
  validation(updateTopicValidation),
  catchError(updateTopic)
);

topicRouter.delete("/:id", catchError(deleteTopic));

topicRouter.delete("/", catchError(deleteAllTopics));

topicRouter.get("/", catchError(getAllTopics));

topicRouter.get("/:id", catchError(getTopic));

export default topicRouter;
