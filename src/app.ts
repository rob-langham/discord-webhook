// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { FileStorage } from "./file-storage";
import { TradeQty } from "./trade-quantity";

const app = express();
app.use(bodyParser.text({ type: "*/*" }));

const port = process.env.PORT || 3000;

const storage = new FileStorage();
const tradeQty = new TradeQty(storage);

app.post("/public/:id/:token", async (req, res) => {
  const webhook = `https://discord.com/api/webhooks/${req.params.id}/${req.params.token}`;

  try {
    await axios.post(webhook, {
      content: tradeQty.addQty(req.body),
    });

    res.status(200).send("");
  } catch (error) {
    const time = Date.now();
    console.error(time, error);
    res.status(500).send(`Error @ ${time}`);
  }
});

app.put("/risk/usdt/:value", async (req, res) => {
  try {
    const risk = parseFloat(req.params.value);
    storage.set("risk_usdt", Math.abs(risk).toFixed(2));
    res.status(200).send("");
  } catch (error) {
    const time = Date.now();
    console.error(time, error);
    res.status(500).send(`Error @ ${time}`);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
