import { GoogleGenerativeAI } from "@google/generative-ai";
import { RequestOptions, AIResponse, PromptInput } from "../core/types";

const chatWithGemini = async (
  apiKey: string,
  prompt: PromptInput,
  options?: RequestOptions,
): Promise<AIResponse> => {
  const client = new GoogleGenerativeAI(apiKey);

  const model = client.getGenerativeModel({
    model: options?.model || "gemini-2.5-flash",
    systemInstruction: options?.system || "You are a helpful assistant",
  });

  const result = await model.generateContent(typeof prompt === 'string' ? prompt : JSON.stringify(prompt));
  return {
    text: result.response.text(),
  };
};

const streamWithGemini = async (
  apiKey: string,
  prompt: string,
  callback: (chunk: string) => void,
  options?: RequestOptions,
): Promise<void> => {
  const client = new GoogleGenerativeAI(apiKey);

  const model = client.getGenerativeModel({
    model: options?.model || "gemini-2.5-flash",
    systemInstruction: options?.system || "You are a helpful assistant",
  });

  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    callback(chunk.text());
  }
};

export { chatWithGemini, streamWithGemini };
