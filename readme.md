# llmix

`llmix` is a small Node.js SDK for using OpenAI, Anthropic, and Gemini through one consistent API. It exposes the same high-level methods across providers so you can switch models without rewriting application logic.

## Features

- Unified `createAI()` entry point
- `chat`, `stream`, `generate`, and `summarize` methods
- Per-request `model` and `system` overrides
- Optional prompt optimization for `chat()` with token savings metadata
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
// CommonJS
const { createAI } = require("llmix");

// ES Modules
import { createAI } from "llmix";

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

| Provider  | Key         | Default Model       |
| --------- | ----------- | ------------------- |
| OpenAI    | `openai`    | `gpt-4`            |
| Anthropic | `anthropic` | `claude-sonnet-4-6` |
| Gemini    | `gemini`    | `gemini-2.5-flash`  |

## API Reference

### `createAI(config)`

Creates a provider client instance.

```javascript
const ai = createAI({
  provider: "openai",      // required
  apiKey: "your-api-key",  // required
  model: "gpt-4o",         // optional, overrides default model
});
```

`config`:

- `provider` - required, one of `openai`, `anthropic`, or `gemini`
- `apiKey` - required provider API key
- `model` - optional default model for the instance

## Methods

### `ai.chat(prompt, options?)`

Sends a prompt and returns a response object with a `text` field. Accepts a plain string or a structured object or array.

```javascript
const response = await ai.chat("What is the capital of France?");
console.log(response.text);
```

With options:

```javascript
const response = await ai.chat("Help me debug this code", {
  model: "gpt-4o",
  system: "You are a senior software engineer",
});
```

With prompt optimization enabled:

```javascript
const response = await ai.chat(
  {
    task: "rank_candidates",
    candidates: [
      { name: "John Doe", role: "Engineer", skills: "React, Node.js", experience: "3 years" },
      { name: "Jane Smith", role: "Engineer", skills: "Vue, Python", experience: "2 years" },
    ],
  },
  { optimize: true },
);

console.log(response.text);
console.log(response.optimization);
// {
//   originalPrompt: '...',
//   optimizedPrompt: '...',
//   originalTokens: 55,
//   optimizedTokens: 48,
//   tokensSaved: 7,
//   percentSaved: '13%',
//   optimizationApplied: true
// }
```

`options`:

- `model` - overrides the model for this request
- `system` - custom system instruction for this request
- `optimize` - when `true`, compresses the prompt before sending to reduce token costs. If the optimized version is not smaller, the original prompt is sent instead and `optimizationApplied` will be `false`

---

### `ai.stream(prompt, callback, options?)`

Streams the response incrementally. The callback receives text chunks as they arrive.

```javascript
await ai.stream("Write a short poem about coding.", (chunk) => {
  process.stdout.write(chunk);
});
```

`callback` receives each streamed text chunk as a string.

---

### `ai.generate(prompt, options?)`

Requests a structured JSON response by prepending strict formatting instructions to the prompt.

```javascript
const response = await ai.generate(
  "List 3 programming languages with a short use case for each.",
);
console.log(response.text);
// {"languages": [{"name": "Python", "use_case": "..."}, ...]}
```

> **Note:** This method instructs the model to return valid JSON, but you should still validate or parse the result before relying on it in production.

---

### `ai.summarize(text, options?)`

Summarizes long text by wrapping the input in a summarization prompt.

```javascript
const response = await ai.summarize("Your long article or text here...");
console.log(response.text);
```

```javascript
// Before - using OpenAI
const ai = createAI({ provider: 'openai', apiKey: process.env.OPENAI_API_KEY })

// After - switch to Anthropic, nothing else changes
const ai = createAI({ provider: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY })
```
---

## Supported Options

All methods accept the same options object:

| Option     | Type      | Description                                                                 |
| ---------- | --------- | --------------------------------------------------------------------------- |
| `model`    | `string`  | Overrides the default model for this request                                |
| `system`   | `string`  | Sets a custom system instruction where supported by the provider            |
| `optimize` | `boolean` | When `true`, rewrites the prompt into a more token-efficient format using TOON before sending (`chat()` only)           |

---

## Switching Providers

Only the provider and API key need to change. Everything else stays the same:

```javascript
const ai = createAI({
  provider: "anthropic",
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await ai.chat("Explain recursion.");
console.log(response.text);
```

---

## Return Shape

`chat()` returns:

```javascript
{
  text: string;
  optimization: {
    originalPrompt: string;
    optimizedPrompt: string;
    originalTokens: number;
    optimizedTokens: number;
    tokensSaved: number;
    percentSaved: string;
    optimizationApplied: boolean;
  } | null;
}
```

`optimization` is `null` when `optimize` is not set. `optimizationApplied` is `false` when the optimized prompt was not smaller than the original.

`stream()`, `generate()`, and `summarize()` return:

```javascript
{
  text: string;
}
```

All methods are asynchronous and return Promises.

---

## Error Handling

Errors from providers are caught and rethrown with a clear message including the provider name:

```javascript
try {
  const response = await ai.chat("Hello");
  console.log(response.text);
} catch (error) {
  console.error(error.message);
  // llmix error [openai]: Invalid API key provided
}
```

---

## Environment Variables

Store your API keys in a `.env` file and read them with `process.env`:

```bash
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GEMINI_API_KEY=your-gemini-key
```

---

## Notes

- Token counts are estimated using OpenAI's tokenizer. Actual counts may vary slightly for Anthropic and Gemini.
- `generate()` is a prompt-based JSON helper, not a schema validator.
- `stream()` is available for all supported providers.
- Errors are thrown if the API key is missing or the provider name is invalid.

## License

MIT
```