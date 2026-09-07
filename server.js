import express from "express";

const app = express();
const port = 3333;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (request, response) => {
  response.render("index", { question: "" });
});

app.post("/ask", (request, response) => {
  const question = request.body.question;
  response.render("index", { question });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});