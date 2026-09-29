import express from "express";

import {
  loadMessages,
  saveMessages
} from "../services/messages.js";

import {
  loadAnswers,
  findBestAnswer
} from "../services/answers.js";

const router = express.Router();


router.get("/", async (request, response) => {
  const messages = await loadMessages();

  response.status(200).json(messages);
});


router.post("/", async (request, response) => {
  const messages = await loadMessages();
  const answers = await loadAnswers();

  const question = request.body.question.trim();

  if (!question) {
    response.status(400).json({
      error: "Skriv et spørgsmål, før du sender."
    });

    return;
  }

  const message = {
    type: "question",
    text: question,
    createdAt: new Date().toISOString()
  };

  messages.push(message);

  const result = findBestAnswer(question, answers);

  const answerMessage = {
    type: "answer",
    text: result.answer,
    createdAt: new Date().toISOString()
  };

  messages.push(answerMessage);

  await saveMessages(messages);

  response.status(201).json({
    question: message,
    answer: answerMessage
  });
});


router.delete("/", async (request, response) => {
  await saveMessages([]);

  response.status(204).send();
});


export default router;