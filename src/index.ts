import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello al-1s!");
});

app.listen(port, () => {
  console.log(`AL-1S is on listening on ${port}`);
});
