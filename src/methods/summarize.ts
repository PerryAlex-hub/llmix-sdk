import { AIConfig, RequestOptions } from "../core/types";
import {chatWithAnthropic} from "../providers/anthropic";
import {chatWithGemini} from "../providers/gemini";
import {chatWithOpenai} from "../providers/openai";

const summarize = async(prompt: string, config: AIConfig, options?: RequestOptions) => {
    const wrappedPrompt = `Summarize the following text: ${prompt}`
  switch (config.provider) {
    case "gemini":
      return chatWithGemini(config.apiKey, wrappedPrompt, options);
    case "anthropic":
      return chatWithAnthropic(config.apiKey, wrappedPrompt, options);
    case "openai":
      return chatWithOpenai(config.apiKey, wrappedPrompt, options);
    default:
      throw new Error(
        "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
      );
  }
};

export default summarize;
