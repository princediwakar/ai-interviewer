// app/api/generate/route.ts
import { NextRequest } from 'next/server';
import { INTERVIEW_GENERATOR_SYSTEM_PROMPT } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, backgroundInfo } = await request.json();

    if (!jobDescription) {
      return new Response(
        JSON.stringify({ error: 'Job description is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const response = await fetch('https://api.deepseek.com/chat/completions', {
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
            content: INTERVIEW_GENERATOR_SYSTEM_PROMPT, 
          },
          {
            role: 'user',
            content: `Job Description:\n${jobDescription}\n\nCandidate Background:\n${backgroundInfo || 'No background provided.'}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`DeepSeek API error: ${response.status}`, errorBody);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let fullContent = '';
        let jsonStr = ''; // Define jsonStr outside the try block

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true }); // Use stream option
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.substring(6);
                if (data.trim() === '[DONE]') continue;
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices[0]?.delta?.content;
                  if (content) {
                    fullContent += content;
                    const contentPayload = JSON.stringify({ type: 'content', content });
                    controller.enqueue(new TextEncoder().encode(`data: ${contentPayload}\n\n`));
                  }
                } catch {
                  // Ignore parsing errors for incomplete JSON chunks from the stream
                }
              }
            }
          }
          
          jsonStr = fullContent;
          const jsonStart = fullContent.indexOf('```json');
          const jsonEnd = fullContent.lastIndexOf('```');

          if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            jsonStr = fullContent.substring(jsonStart + 7, jsonEnd).trim();
          }

          // **CHANGE 1: Sanitize the JSON string to remove common errors like trailing commas**
          const sanitizedJsonStr = jsonStr.replace(/,(?=\s*[}\]])/g, '');

          // **CHANGE 2: Parse the sanitized string**
          const finalJson = JSON.parse(sanitizedJsonStr);
          const responsePayload = JSON.stringify({ type: 'complete', data: finalJson });
          controller.enqueue(new TextEncoder().encode(`data: ${responsePayload}\n\n`));

        } catch (error) {
          // **CHANGE 3: Add detailed logging for the problematic string**
          console.error('Stream processing error: Failed to parse JSON.');
          console.error('--- The problematic string was: ---');
          console.error(jsonStr);
          console.error('--- End of problematic string ---');
          console.error(error);

          const errorPayload = JSON.stringify({ type: 'error', error: 'Failed to process and parse the AI response stream.' });
          controller.enqueue(new TextEncoder().encode(`data: ${errorPayload}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(
      JSON.stringify({ error: 'An internal server error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}