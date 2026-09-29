import fs from "node:fs/promises";

export async function loadAnswers() {
  const data = await fs.readFile("./data/answers.json", "utf8");

  return JSON.parse(data);
}

export async function saveAnswers(answers) {
  const json = JSON.stringify(answers, null, 2);

  await fs.writeFile("./data/answers.json", json);
}

function countMatches(keywords, normalizedQuestion) {
  const matches = keywords.filter((keyword) =>
    normalizedQuestion.includes(keyword)
  );

  return matches.length;
}

export function findBestAnswer(question, answers) {
  const normalizedQuestion = question.toLowerCase();

  let bestScore = 0;
  let bestAnswer = "Det kender jeg ikke svaret på endnu.";
  let bestCategory = "";

  for (const answerGroup of answers) {
    const score = countMatches(
      answerGroup.keywords,
      normalizedQuestion
    );

    console.log(answerGroup.keywords, score);

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = answerGroup.answer;
      bestCategory = answerGroup.category;
    }
  }

  return {
    answer: bestAnswer,
    category: bestCategory
  };
}