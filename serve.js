const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Serve static files (like index.html, script.js, style.css)
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
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
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

// Fallback for serving index.html for any route not matched
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
