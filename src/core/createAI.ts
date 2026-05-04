import { AIConfig } from "./types";

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
    chat: () => {},
    stream: () => {},
    generate: () => {},
    summarize: () => {},
  };
};

export default createAI