import OpenAI from "openai";
import { AIResponse, RequestOptions } from "../core/types";

const chatWithOpenai = async (
  apiKey: string,
  prompt: string,
  options?: RequestOptions,
): Promise<AIResponse> => {
  const client = new OpenAI({ apiKey });

  const response = await client.chat.completions.create({
    model: options?.model || "gpt-4",
    messages: [
      {
        role: "system",
        content: options?.system || "You are a helpful assistant",
      },
      { role: "user", content: prompt },
    ],
  });

  return {
    text: response.choices[0].message.content || "",
  };
};

const streamWithOpenai = async (
  apiKey: string,
  prompt: string,
  callback: (chunk: string) => void,
  options?: RequestOptions,
): Promise<void> => {
  const client = new OpenAI({ apiKey });

  const stream = await client.chat.completions.stream({
    model: options?.model || "gpt-4o",
    messages: [
      {
        role: "system",
        content: options?.system || "You are a helpful assistant",
      },
      { role: "user", content: prompt },
    ],
  });

  for await (const chunk of stream) {
    callback(chunk.choices[0]?.delta?.content || "");
  }
};

export { chatWithOpenai, streamWithOpenai };
