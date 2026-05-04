import chat from "../methods/chat";
import generate from "../methods/generate";
import stream from "../methods/stream";
import summarize from "../methods/summarize";
import { AIConfig, RequestOptions } from "./types";

export const validProviders = ["openai", "gemini", "anthropic"];

const createAI = (config: AIConfig) => {
  if (!config.apiKey) {
    throw new Error("Apikey is missing");
  }

  if (!config.provider) {
    throw new Error("Please input your llm provider");
  }

  if (!validProviders.includes(config.provider)) {
    throw new Error(
      "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
    );
  }

  return {
    chat: (prompt: string, options?: RequestOptions) =>
      chat(prompt, config, options),
    stream: (
      prompt: string,
      callback: (chunk: string) => void,
      options?: RequestOptions,
    ) => stream(prompt, config, callback, options),
    generate: (prompt: string, options?: RequestOptions) =>
      generate(prompt, config, options),
    summarize: (prompt: string, options?: RequestOptions) =>
      summarize(prompt, config, options),
  };
};

export default createAI;
