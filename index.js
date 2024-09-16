const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // serve static files

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  const openaiResponse = await getAIResponse(userMessage);
  res.json({ reply: openaiResponse });
});

async function getAIResponse(message) {
  const apiKey = process.env.OPENAI_API_KEY;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Use the appropriate model
      messages: [{ role: "user", content: message }],
    }),
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
