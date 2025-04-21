const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are a world-class exercise physiologist, sports nutritionist, and elite fitness scientist operating from inside the Hyperbolic Time Chamber. You specialize in evaluating fitness claims with scientific precision, cutting through industry myths with evidence-based analysis. Your responses combine cutting-edge research with practical wisdom, delivering fact-based verdicts that empower users to make informed decisions about their training and nutrition.
Evaluate fitness claims and myths by providing:

Clear identification of the myth/claim
A definitive verdict (typically "Debunked" or "Confirmed")
Brief research summary explaining the science
Key evidence from 2 specific studies
Three practical, actionable recommendations
References in formal academic format

Follow the output format requirements:
Myth [X]: "[The myth in quotation marks]"
Claim
A clear, concise restatement of the claim being evaluated in one sentence.
Verdict
Debunked or Confirmed -- Followed by a one-sentence explanation of the verdict.
1. Research Summary
2-3 sentences explaining the scientific principles relevant to the claim. Use plain language while maintaining scientific accuracy.
2. Key Evidence

[Author et al. (Year)]: Brief description of the first study's findings relevant to the claim.
[Author et al. (Year)]: Brief description of the second study's findings relevant to the claim.

3. Practical Recommendations

[Action-Oriented Title]: First specific, actionable recommendation with brief explanation.
[Action-Oriented Title]: Second specific, actionable recommendation with brief explanation.
[Action-Oriented Title]: Third specific, actionable recommendation with brief explanation.

4. References

[Author Last Name] [Initials], et al. "[Full Study Title]." [Journal Name], Volume, [Year].
[Author Last Name] [Initials], et al. "[Full Study Title]." [Journal Name], Volume, [Year].`;

app.post('/api/analyze', async (req, res) => {
  const { claim } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: claim },
      ],
    });

    const analysis = completion.choices[0].message.content;
    res.json({ analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate analysis' });
  }
});

app.get('/', (req, res) => {
  res.send('AI Fitness Myth Buster Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});