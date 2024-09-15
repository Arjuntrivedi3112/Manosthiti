const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable in Vercel
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: userMessage }],
            }),
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(3000, () => {
    console.log('Backend is running on http://localhost:3000');
});
