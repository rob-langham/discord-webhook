// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.text({ type: "*/*" }));

const port = process.env.PORT || 3000;

const id = process.env.WEBHOOK_ID;
const token = process.env.WEBHOOK_TOKEN;

app.post("/", async (req, res) => {
  const webhook = `https://discord.com/api/webhooks/${id}/${token}`;

  try {
    await axios.post(webhook, {
      content: req.body,
    });

    res.status(200).send("");
  } catch (error) {
    const time = Date.now();
    console.error(time, error);
    res.status(500).send(`Error @ ${time}`);
  }
});

if (!id || !token) {
  console.error("Missing Discord Webhook ID or Token");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
