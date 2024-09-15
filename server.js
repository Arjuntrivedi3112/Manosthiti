const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
require('dotenv').config(); // To load .env variables

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Make sure your API key is correct
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4', // Make sure this model matches your OpenAI account capabilities
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error'
