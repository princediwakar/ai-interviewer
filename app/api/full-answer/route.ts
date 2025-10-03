import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, jobDescription, backgroundInfo } = await request.json();

    if (!question || !jobDescription || !backgroundInfo) {
      return new Response(
        JSON.stringify({ error: 'Question, job description, and background information are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are an experienced professional being interviewed for this specific role. Your task is to provide a complete, well-structured interview answer based on the candidate's actual background and experience.

Instructions:
1. Answer as if you ARE the candidate being interviewed
2. Use the STAR method when telling stories (Situation, Task, Action, Result)
3. Reference specific experiences from the candidate's background
4. Make the answer realistic and conversational
5. Include metrics and specific details when available
6. Keep the answer to 2-3 minutes when spoken (200-300 words)
7. Show enthusiasm and knowledge about the role

IMPORTANT: Return your response as a valid JSON object with this exact structure (no markdown formatting):
{
  "answer": "Your complete interview answer here"
}`
          },
          {
            role: 'user',
            content: `Job Description:
${jobDescription}

My Background (speak as this person):
${backgroundInfo}

Interview Question:
${question}

Please provide a complete interview answer as if you are this candidate.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in response');
    }

    // Clean and parse the response
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      const parsedContent = JSON.parse(cleanContent);
      if (parsedContent.answer) {
        return new Response(
          JSON.stringify(parsedContent),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        throw new Error('Invalid response format');
      }
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error generating full answer:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate full answer' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}