const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/process', async (req, res) => {
    const { action, text } = req.body;

    const promptMap = {
        explain: `Explain the following study topic in simple, beginner-friendly terms: ${text}`,
        summarize: `Summarize the following study notes into key bullet points: ${text}`,
        quiz: `Generate 3 multiple-choice questions based on the following text: ${text}. Format each with a question and 4 options.`,
        flashcards: `Create 5 flashcards (term/definition pairs) from: ${text}. Format as JSON: [{front:'', back:''}]`
    };

    try {
        const response = await axios.post('[api.openai.com](https://api.openai.com/v1/chat/completions)', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: promptMap[action] }],
            temperature: 0.7
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        res.json({ result: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'AI service unavailable' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));