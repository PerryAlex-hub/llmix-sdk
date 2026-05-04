# llmix

`llmix` is a small Node.js SDK for using OpenAI, Anthropic, and Gemini through one consistent API. It exposes the same high-level methods across providers so you can switch models without rewriting application logic.

## Features

- Unified `createAI()` entry point
- `chat`, `stream`, `generate`, and `summarize` methods
- Per-request `model` and `system` overrides
- Provider switching with minimal code changes

## Installation

```bash
npm install llmix
```

If you are using the source directly in this repository, install dependencies and build first:

```bash
npm install
npm run build
```

## Requirements

- Node.js 18 or newer is recommended
- Valid API key for the provider you want to use
- TypeScript is included for development and builds, but the package is consumable from plain JavaScript after compilation

## Quick Start

```javascript
const { createAI } = require("llmix");

async function main() {
  const ai = createAI({
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await ai.chat("Explain black holes in one paragraph.");
  console.log(response.text);
}

main().catch(console.error);
```

## Supported Providers

| Provider  | Key         | Default chat model  | Default stream model |
| --------- | ----------- | ------------------- | -------------------- |
| OpenAI    | `openai`    | `gpt-4`             | `gpt-4`             |
| Anthropic | `anthropic` | `claude-sonnet-4-6` | `claude-sonnet-4-6`  |
| Gemini    | `gemini`    | `gemini-2.5-flash`  | `gemini-2.5-flash`   |

## API Reference

### `createAI(config)`

Creates a provider client instance.

```javascript
const ai = createAI({
  provider: 'openai',      // required
  apiKey: 'your-api-key',  // required
  model: 'gpt-4'     // optional, overrides default model
});
```

`config`:

- `provider` - required, one of `openai`, `anthropic`, or `gemini`
- `apiKey` - required provider API key
- `model` - optional default model for the instance

## Methods

### `ai.chat(prompt, options?)`

Sends a prompt and returns a response object with a `text` field.

```javascript
const response = await ai.chat("What is the capital of France?");
console.log(response.text);
```

`options`:

- `model` - overrides the model for this request
- `system` - custom system instruction for this request

### `ai.stream(prompt, callback, options?)`

Streams the response incrementally. The callback receives text chunks as they arrive.

```javascript
await ai.stream("Write a short poem about coding.", (chunk) => {
  process.stdout.write(chunk);
});
```

`callback` receives each streamed text chunk as a string.

### `ai.generate(prompt, options?)`

Requests a JSON-style response by prepending strict formatting instructions to the prompt.

```javascript
const response = await ai.generate(
  "List 3 programming languages with a short use case for each.",
);
console.log(response.text);
```

Important: this method asks the model to return valid JSON, but you should still validate or parse the result before relying on it.

### `ai.summarize(text, options?)`

Summarizes long text by wrapping the input in a summarization prompt.

```javascript
const response = await ai.summarize("Your long article or text here...");
console.log(response.text);
```

## Provider Options

You can pass the same request options to every method:

```javascript
const response = await ai.chat("Help me debug this code", {
  model: "gpt-4",
  system: "You are a senior software engineer",
});
```

Supported options:

- `model` - overrides the default model for the provider call
- `system` - sets the system instruction where supported by the provider

## Switching Providers

Only the provider and API key need to change:

```javascript
const ai = createAI({
  provider: "anthropic",
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

The method names and return shape stay the same.

## Return Shape

All non-streaming methods return an object shaped like this:

```javascript
{
  text: string;
}
```

All methods are asynchronous and return Promises.

## Example: Environment Variables

Create a `.env` file or export environment variables in your shell:

```bash
OPENAI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
GEMINI_API_KEY=your-key
```

Then read them in your code with `process.env`.

## Notes

- `generate()` is a prompt-based JSON helper, not a schema validator
- `stream()` is available for all supported providers
- Errors are wrapped with provider context, for example `llmix error [openai]: ...`
- Errors are thrown if the API key is missing or the provider name is invalid

## License

MIT
