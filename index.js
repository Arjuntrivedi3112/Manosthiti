const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage); // Debugging log

    try {
        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable for security
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4', // Use the correct model ID
                messages: [{ role: 'user', content: userMessage }],
            }),
        });

        const data = await response.json();
        console.log('Response from OpenAI:', data); // Debugging log

        // Extract bot's reply
        const botReply = data.choices[0].message.content;

        // Send the reply back to the frontend
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error calling OpenAI API:', error); // Log error for debugging
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
