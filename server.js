const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Replace with Gemini API URL
        const geminiApiUrl = 'https://gemini.api.example.com/v1/chat'; // You need to replace this with the actual Gemini API URL
        const apiKey = process.env.GEMINI_API_KEY;

        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: userMessage,
                model: 'gemini-pro', // Adjust the model as necessary
                max_tokens: 150
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message;

        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to communicate with the AI.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
