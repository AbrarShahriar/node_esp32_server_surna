const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(express.json());

let matrixState = [];

app.get("/", (req, res) => {
  res.status(200).json(matrixState);
});

app.post("/", (req, res) => {
  matrixState = req.body.matrixState;
  res.status(200).json(matrixState);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
