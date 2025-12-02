const authRouter = require("./routes/auth");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");

const booksrouter = require("./routes/books");
const categoryRouter = require("./routes/category");
const authorRouter = require("./routes/autor");
const editorialRouter = require("./routes/editorials");
const usersRouter = require("./routes/users");
const requestsRouter = require("./routes/requests");
const authorization = require("./middleware/auth");

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.get("/", (req, res) => {
  res.send("hola");
});

app.use("/api/books", booksrouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/authors", authorRouter);
app.use("/api/editorials", editorialRouter);
app.use("/api/users", authorization, usersRouter);
app.use("/api/requests", requestsRouter);

app.listen(port, () => {
  console.log("listening");
});
