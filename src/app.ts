// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { storage } from "./file-storage";
import { TradeQty } from "./trade-quantity";
import "./discord";
import { EmojiReplacer } from "./emoji-replacer";
import handlebars from "handlebars";

handlebars.registerHelper("eq", function (this: any, a, b, opts) {
  if (a == b) {
    return true;
  } else {
    return false;
  }
});

handlebars.registerHelper("switch", function (this: any, value, options) {
  this.switch_value = value;
  this.switch_break = false;
  return options.fn(this);
});

handlebars.registerHelper("case", function (this: any, value, options) {
  if (value == this.switch_value) {
    this.switch_break = true;
    return options.fn(this);
  }
});

handlebars.registerHelper("default", function (this: any, value, options) {
  if (this.switch_break == false) {
    return options.fn(this);
  }
});

const app = express();
app.use(bodyParser.json());
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

app.put("/template", async (req, res) => {
  const { name, template, webhook } = req.body;
  storage.set(`template.${name}`, { template, webhook });
  res.sendStatus(204);
});

app.post("/template/test", async (req, res) => {
  try {
    const { template: templateName, ...params } = req.body;
    const { template: storedTemplate, webhook: storedWebhook } = storage.get(
      `template.${templateName}`
    );

    if (!storedTemplate || !storedWebhook) {
      res.status(400).send("Template not found");
      return;
    }

    const template = handlebars.compile(storedTemplate);

    res.status(200).send(template(params));
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
