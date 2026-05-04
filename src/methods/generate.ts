import { AIConfig, RequestOptions } from "../core/types";
import {chatWithAnthropic} from "../providers/anthropic";
import {chatWithGemini} from "../providers/gemini";
import {chatWithOpenai} from "../providers/openai";

const generate = async(prompt: string, config: AIConfig, options?: RequestOptions) => {
    const JsonPrompt = `Respond with valid JSON only, no extra text, no markdown, no backticks. ${prompt}`
  switch (config.provider) {
    case "gemini":
      return chatWithGemini(config.apiKey, JsonPrompt, options);
    case "anthropic":
      return chatWithAnthropic(config.apiKey, JsonPrompt, options);
    case "openai":
      return chatWithOpenai(config.apiKey, JsonPrompt, options);
    default:
      throw new Error(
        "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
      );
  }
};

export default generate;
