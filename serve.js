const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(bodyParser.json()); // To handle JSON request bodies

// Serve static files directly from the root directory
app.use(express.static(__dirname));

// API endpoint for handling chat requests
app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        const openaiResponse = await getAIResponse(userMessage);
        res.json({ reply: openaiResponse });
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Helper function to interact with OpenAI API
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

    if (!response.ok) {
        throw new Error("Failed to fetch response from OpenAI API");
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Fallback route to serve index.html from the root directory for any unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server on port 3000 or the port specified by the environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
