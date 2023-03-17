const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
const uri = process.env.URI || "";
const id = process.env.ID || "";

const StateSchema = new mongoose.Schema({
  matrixState: [Number],
});
const State = mongoose.model("State", StateSchema);

// main().catch((err) => console.log(err));
main();

async function main() {
  await mongoose.connect(uri);

  app.get("/", async (req, res) => {
    let matrixStateDoc = await State.findById(id).exec();
    // @ts-ignore
    res.status(200).json(matrixStateDoc.matrixState);
  });

  app.post("/", async (req, res) => {
    let matrixState = req.body.matrixState;
    console.log(matrixState);
    let updatedMatrixStateDoc = await State.findByIdAndUpdate(
      { _id: id },
      { matrixState }
    );
    // @ts-ignore
    res.status(200).json(updatedMatrixStateDoc.matrixState);
  });

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}
