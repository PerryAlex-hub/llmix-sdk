import { AIConfig, RequestOptions } from "../core/types";
import { streamWithAnthropic } from "../providers/anthropic";
import { streamWithGemini } from "../providers/gemini";
import { streamWithOpenai } from "../providers/openai";

const stream = async (
  prompt: string,
  config: AIConfig,
  callback: (chunk: string) => void,
  options?: RequestOptions,
) => {
  switch (config.provider) {
    case "gemini":
      return streamWithGemini(config.apiKey, prompt, callback, options);
    case "anthropic":
      return streamWithAnthropic(config.apiKey, prompt, callback, options);
    case "openai":
      return streamWithOpenai(config.apiKey, prompt, callback, options);
    default:
      throw new Error(
        "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
      );
  }
};

export default stream;
