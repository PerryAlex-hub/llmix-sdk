import Anthropic from "@anthropic-ai/sdk";
import { RequestOptions, AIResponse } from "../core/types";

const chatWithAnthropic = async (
  apiKey: string,
  prompt: string,
  options?: RequestOptions,
): Promise<AIResponse> => {
  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: options?.model || "claude-sonnet-4-6",
    max_tokens: 1024,
    system: options?.system || "You are a helpful assistant",
    messages: [{ role: "user", content: prompt }],
  });

  return {
    text: response.content[0].type === "text" ? response.content[0].text : "",
  };
};

const streamWithAnthropic = async (
  apiKey: string,
  prompt: string,
  callback: (chunk: string) => void,
  options?: RequestOptions
): Promise<void> => {
  const client = new Anthropic({ apiKey })

  const stream = await client.messages.stream({
    model: options?.model || 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: options?.system || 'You are a helpful assistant',
    messages: [{ role: 'user', content: prompt }]
  })

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      callback(chunk.delta.text)
    }
  }
}

export {chatWithAnthropic, streamWithAnthropic};