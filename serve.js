const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname)); // This will serve files like index.html, script.js, and style.css from the root folder

// API endpoint to handle chat requests
app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Message is required." });
    }

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

// Fallback to serve index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Serve index.html from root directory
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
