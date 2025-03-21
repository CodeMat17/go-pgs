// convex/askAI.ts
import { action } from "./_generated/server";
import { OpenAI } from "openai";
import { api } from "..//convex/_generated/api";
import { v } from "convex/values";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = action({
  args: {
    question: v.string(),
  },
  handler: async (ctx, { question }) => {
    // Fetch all content from Convex
    const content = await ctx.runQuery(api.getAllContent.getAllContent);

    // Prepare the context for the AI (explicit string type)
    const context: string = JSON.stringify(content);

    // Create messages with explicit types
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a helpful assistant. Use this data: ${context}`,
      },
      {
        role: "user",
        content: question,
      },
    ];

    // Make the API call with properly typed parameters
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    return response.choices[0].message.content;
  },
});
