import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, jobDescription, backgroundInfo, questionType, questionTags } = await request.json();

    if (!question) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
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
            content: `You are an experienced professional providing a complete, well-structured interview answer.

Instructions:
1. If a job description and background are provided, answer as if you are that specific candidate
2. If no specific background is provided, give a general but strong example answer
3. Use the STAR method when telling stories (Situation, Task, Action, Result)
4. Make the answer realistic and conversational
5. Include metrics and specific details when possible
6. Keep the answer to 2-3 minutes when spoken (200-300 words)
7. Show enthusiasm and relevant knowledge

IMPORTANT: Return your response as a valid JSON object with this exact structure (no markdown formatting):
{
  "answer": "Your complete interview answer here"
}`
          },
          {
            role: 'user',
            content: `${jobDescription ? `Job Description:
${jobDescription}

` : ''}${backgroundInfo ? `Background (speak as this person):
${backgroundInfo}

` : ''}Interview Question: ${question}
${questionType ? `Question Type: ${questionType}` : ''}
${questionTags?.length ? `Question Tags: ${questionTags.join(', ')}` : ''}

Please provide a complete interview answer${backgroundInfo ? ' as if you are this candidate' : ' with a strong example'}.`
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
    } catch {
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