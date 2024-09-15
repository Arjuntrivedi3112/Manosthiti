const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config(); // To use .env file

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage); // Debugging log

    try {
        const openaiApiKey = process.env.OPENAI_API_KEY;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Use the correct model ID
                messages: [{ role: 'user', content: userMessage }],
            }),
        });

        const data = await response.json();
        console.log('Response from OpenAI:', data); // Debugging log

        if (data.choices && data.choices[0]) {
            const botReply = data.choices[0].message.content;
            res.json({ reply: botReply });
        } else {
            res.status(500).json({ error: 'No valid response from OpenAI' });
        }
    } catch (error) {
        console.error('Error calling OpenAI API:', error); // Log error for debugging
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
