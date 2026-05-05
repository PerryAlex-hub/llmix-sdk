interface AIConfig {
  provider: "openai" | "gemini" | "anthropic";
  apiKey: string;
  model?: string;
}

interface AIResponse {
  text: string;
}

interface RequestOptions {
  model?: string;
  system?: string;
  optimize?: boolean;
}

export type PromptInput = string | object | any[]

export { AIConfig, AIResponse, RequestOptions };
