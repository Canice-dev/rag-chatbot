import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try{
    const { messages }: {messages: UIMessage[]} = await req.json();

    const result = streamText({
      model: google('gemini-2.5-flash'),
      //added await
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch(error) {
    console.log("Error in chat route completion:", error);
    return new Response("Error to stream chat completion", { status: 500 });
  }
}

