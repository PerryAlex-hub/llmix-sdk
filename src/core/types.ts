interface AIConfig {
    provider: 'openai' | "gemini" | "anthropic";
    apiKey: string;
    model?: string;
}

interface AIResponse {
    text: string;
}

interface RequestOptions {
    model?: string;
    system?: string;
}

export {AIConfig, AIResponse, RequestOptions}