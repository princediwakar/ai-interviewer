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
            content: `You are an expert interview coach. Your task is to provide personalized answer guidance for a specific interview question based on the candidate's background and the job they're applying for.

Instructions:
1. Analyze the interview question in the context of the job role
2. Provide specific guidance on how to approach this question
3. Reference the candidate's actual experience when relevant
4. Suggest key points they should cover
5. Recommend the STAR method if applicable
6. Keep guidance concise but actionable (2-3 key points)

IMPORTANT: Return your response as a valid JSON object with this exact structure (no markdown formatting):
{
  "guidance": "Your personalized answer guidance here"
}`
          },
          {
            role: 'user',
            content: `Job Description:
${jobDescription}

Candidate Background:
${backgroundInfo}

Interview Question:
${question}

Please provide personalized answer guidance for this question.`
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
    } catch (parseError) {
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