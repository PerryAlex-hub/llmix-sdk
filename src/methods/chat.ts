import { AIConfig, RequestOptions } from "../core/types";
import {chatWithAnthropic} from "../providers/anthropic";
import {chatWithGemini} from "../providers/gemini";
import {chatWithOpenai} from "../providers/openai";

const chat = async(prompt: string, config: AIConfig, options?: RequestOptions) => {
  switch (config.provider) {
    case "gemini":
      return chatWithGemini(config.apiKey, prompt, options);
    case "anthropic":
      return chatWithAnthropic(config.apiKey, prompt, options);
    case "openai":
      return chatWithOpenai(config.apiKey, prompt, options);
    default:
      throw new Error(
        "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
      );
  }
};

export default chat;
