// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4', // Ensure your OpenAI account supports this model
                messages: [{ role: 'user', content: userMessage }],
            }),
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            const botReply = data.choices[0].message.content;
            res.json({ reply: botReply });
        } else {
            res.status(500).json({ error: 'No response from AI' });
        }
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
