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
            content: `You are an expert interview coach. Your task is to provide answer guidance for interview questions.

Instructions:
1. Analyze the interview question and provide practical guidance
2. If a job description is provided, tailor advice to that specific role
3. If no job description is provided, give general best-practice guidance
4. Reference the candidate's background when available
5. Suggest key points they should cover
6. Recommend the STAR method when applicable for behavioral questions
7. Keep guidance concise but actionable (2-3 key points)

IMPORTANT: Return your response as a valid JSON object with this exact structure (no markdown formatting):
{
  "guidance": "Your answer guidance here"
}`
          },
          {
            role: 'user',
            content: `${jobDescription ? `Job Description:
${jobDescription}

` : ''}${backgroundInfo ? `Candidate Background:
${backgroundInfo}

` : ''}Interview Question: ${question}
${questionType ? `Question Type: ${questionType}` : ''}
${questionTags?.length ? `Question Tags: ${questionTags.join(', ')}` : ''}

Please provide ${jobDescription && backgroundInfo ? 'personalized ' : ''}answer guidance for this ${questionType || 'interview'} question.`
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
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
      if (parsedContent.guidance) {
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
    console.error('Error generating guidance:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate answer guidance' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}