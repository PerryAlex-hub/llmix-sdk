import { AIConfig, RequestOptions } from "../core/types";
import {chatWithAnthropic} from "../providers/anthropic";
import {chatWithGemini} from "../providers/gemini";
import {chatWithOpenai} from "../providers/openai";

const chat = async (prompt: string, config: AIConfig, options?: RequestOptions) => {
  try {
    switch (config.provider) {
      case 'gemini':
        return await chatWithGemini(config.apiKey, prompt, options)
      case 'anthropic':
        return await chatWithAnthropic(config.apiKey, prompt, options)
      case 'openai':
        return await chatWithOpenai(config.apiKey, prompt, options)
      default:
        throw new Error("Provider not supported. Please choose 'openai', 'anthropic' or 'gemini'")
    }
  } catch (error: any) {
    throw new Error(`llmix error [${config.provider}]: ${error.message}`)
  }
}

export default chat;
