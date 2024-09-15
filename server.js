const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('google-generative-ai'); // Ensure this module is installed
require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Welcome route
app.get('/', (req, res) => {
    res.json({ msg: "Welcome, Welcome, Bhale Padhara" });
});

// Chat route for Gemini API
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const prompt = `${userMessage} generate 5 MCQs with correct answers in JSON format`;

        // Call the run function with the prompt
        let data = await run(prompt);
        
        // Send the result back
        res.json({ reply: data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Function to interact with the Gemini API
async function run(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Make sure to set this variable in Vercel
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    try {
        const result = await model.generateContent(prompt);
        return result.response.text(); // Adjust based on the actual API response format
    } catch (error) {
        console.error('Error with Gemini API:', error);
        throw new Error('Error with Gemini API');
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
