// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { storage } from "./file-storage";
import { TradeQty } from "./trade-quantity";
import "./discord";
import { EmojiReplacer } from "./emoji-replacer";

const app = express();
app.use(bodyParser.text({ type: "*/*" }));

const port = process.env.PORT || 3000;

const tradeQty = new TradeQty(storage);

app.post("/public/:id/:token", async (req, res) => {
  const webhook = `https://discord.com/api/webhooks/${req.params.id}/${req.params.token}`;

  try {
    await axios.post(webhook, {
      content: tradeQty.addQty(EmojiReplacer.injectEmoji(req.body)),
    });

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
