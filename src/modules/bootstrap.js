import noteRouter from "./note/note.routes.js";
import sentenceRouter from "./sentenceTranslate/sentenceTranslate.routes.js";
import topicRouter from "./topic/topic.routes.js";
import wordRouter from "./wordsTranslate/wordsTranslate.routes.js";

const baseUrl = "/api/v1";

const bootstrap = (app) => {
  /* Add Words */

  app.use(`${baseUrl}/words`, wordRouter);

  /* Sentences */

  app.use(`${baseUrl}/sentences`, sentenceRouter);

  /* Notes */

  app.use(`${baseUrl}/notes`, noteRouter);

  /* Topics */

  app.use(`${baseUrl}/topics`, topicRouter);
};

export default bootstrap;
