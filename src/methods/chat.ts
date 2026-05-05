import { AIConfig, PromptInput, RequestOptions } from "../core/types";
import { chatWithAnthropic } from "../providers/anthropic";
import { chatWithGemini } from "../providers/gemini";
import { chatWithOpenai } from "../providers/openai";
import { optimize } from "../utils/optimize";

const chat = async (
  prompt: PromptInput,
  config: AIConfig,
  options?: RequestOptions,
) => {
  try {
    const optimizationResult = options?.optimize ? optimize(prompt) : null;

    const finalPrompt = optimizationResult
      ? optimizationResult.optimizedPrompt
      : prompt;
    let response;
    switch (config.provider) {
      case "gemini":
        response = await chatWithGemini(config.apiKey, finalPrompt, options);
        break;
      case "anthropic":
        response = await chatWithAnthropic(config.apiKey, finalPrompt, options);
        break;
      case "openai":
        response = await chatWithOpenai(config.apiKey, finalPrompt, options);
        break;
      default:
        throw new Error(
          "Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'",
        );
    }
    return {
      ...response,
      optimization: optimizationResult
        ? {
            originalPrompt: optimizationResult.originalPrompt,
            optimizedPrompt: optimizationResult.optimizedPrompt,
            originalTokens: optimizationResult.originalTokens,
            optimizedTokens: optimizationResult.optimizedTokens,
            tokensSaved: optimizationResult.tokensSaved,
            percentSaved: optimizationResult.percentSaved,
            optimizationApplied: optimizationResult.optimizationApplied,
          }
        : null,
    };
  } catch (error: any) {
    throw new Error(`llmix error [${config.provider}]: ${error.message}`);
  }
};

export default chat;
