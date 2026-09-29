import express from "express";

import {
  loadAnswers,
  saveAnswers
} from "../services/answers.js";

const router = express.Router();


router.get("/", async (request, response) => {
  const answers = await loadAnswers();

  response.json(answers);
});


router.get("/:category", async (request, response) => {
  const answers = await loadAnswers();

  const answerRule = answers.find(
    (answer) => answer.category === request.params.category
  );

  if (!answerRule) {
    response.status(404).json({
      error: "kategorien blev ikke fundet"
    });
    return;
  }

  response.status(200).json(answerRule);
});


router.post("/", async (request, response) => {
  const answers = await loadAnswers();

  const newAnswerRule = {
    category: request.body.category,
    keywords: request.body.keywords,
    answer: request.body.answer
  };

    if (
    !request.body.category ||
    !request.body.keywords ||
    !request.body.answer
  ) {
    response.status(400).json({
      error: "Category, keywords og answer skal udfyldes."
    });
    return;
  }

  answers.push(newAnswerRule);

  await saveAnswers(answers);

  response.status(201).json(newAnswerRule);
});


router.put("/:category", async (request, response) => {
  const answers = await loadAnswers();

  const answerRule = answers.find(
    (answer) => answer.category === request.params.category
  );

  if (!answerRule) {
    response.status(404).json({
      error: "Kategorien blev ikke fundet."
    });
    return;
  }

  if (!request.body.keywords || !request.body.answer) {
    response.status(400).json({
      error: "Keywords og answer skal udfyldes."
    });
    return;
  }

  answerRule.keywords = request.body.keywords;
  answerRule.answer = request.body.answer;

  await saveAnswers(answers);

  response.status(200).json(answerRule);
});

export default router;