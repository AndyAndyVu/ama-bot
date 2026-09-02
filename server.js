import express from "express";

const server = express();
const port = 3333;

server.get("/", (request, response) => {
  response.send("Hello Express.js 🎉");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});