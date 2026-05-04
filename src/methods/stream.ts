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
  try {
    switch (config.provider) {
      case "gemini":
        return await streamWithGemini(config.apiKey, prompt, callback, options);
      case "anthropic":
        return await streamWithAnthropic(
          config.apiKey,
          prompt,
          callback,
          options,
        );
      case "openai":
        return await streamWithOpenai(config.apiKey, prompt, callback, options);
      default:
        throw new Error(
          "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
        );
    }
  } catch (error: any) {
    throw new Error(`llmix error [${config.provider}]: ${error.message}`);
  }
};

export default stream;
