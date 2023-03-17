const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4001;
const PATH = path.resolve(__dirname, "data.json");

console.log(PATH);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  let RAW_matrixState = fs.readFileSync(PATH, { encoding: "utf-8" });
  let matrixState = JSON.parse(RAW_matrixState);
  res.status(200).json(matrixState);
});

app.post("/", (req, res) => {
  let RES_matrixState = req.body.matrixState;

  fs.writeFileSync(PATH, JSON.stringify(RES_matrixState, null, 2), {
    encoding: "utf-8",
  });

  res.status(200).json(RES_matrixState);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
