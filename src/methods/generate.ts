import { AIConfig, RequestOptions } from "../core/types";
import { chatWithAnthropic } from "../providers/anthropic";
import { chatWithGemini } from "../providers/gemini";
import { chatWithOpenai } from "../providers/openai";

const generate = async (
  prompt: string,
  config: AIConfig,
  options?: RequestOptions,
) => {
  const JsonPrompt = `Respond with valid JSON only, no extra text, no markdown, no backticks. ${prompt}`;
  try {
    switch (config.provider) {
      case "gemini":
        return await chatWithGemini(config.apiKey, JsonPrompt, options);
      case "anthropic":
        return await chatWithAnthropic(config.apiKey, JsonPrompt, options);
      case "openai":
        return await chatWithOpenai(config.apiKey, JsonPrompt, options);
      default:
        throw new Error(
          "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
        );
    }
  } catch (error: any) {
    throw new Error(`llmix error [${config.provider}]: ${error.message}`);
  }
};

export default generate;
