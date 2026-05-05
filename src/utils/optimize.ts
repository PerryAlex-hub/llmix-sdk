import { encode } from '@toon-format/toon'
import { encoding_for_model } from 'tiktoken'

type PromptInput = string | object | any[]

export const optimize = (prompt: PromptInput) => {

  const promptString = typeof prompt === 'string'
    ? prompt
    : JSON.stringify(prompt)

  const encoder = encoding_for_model('gpt-4o')
  const originalTokens = encoder.encode(promptString).length

  const encodedPrompt = encode(prompt)
  const encodedString = typeof encodedPrompt === 'string'
    ? encodedPrompt
    : JSON.stringify(encodedPrompt)

  const optimizedTokens = encoder.encode(encodedString).length

  encoder.free()

  const savedTokens = originalTokens - optimizedTokens

return {
  originalPrompt: promptString,
  optimizedPrompt: savedTokens > 0 ? encodedString : promptString,
  originalTokens,
  optimizedTokens: savedTokens > 0 ? optimizedTokens : originalTokens,
  tokensSaved: savedTokens > 0 ? savedTokens : 0,
  percentSaved: savedTokens > 0 
    ? `${Math.round((1 - optimizedTokens / originalTokens) * 100)}%` 
    : '0%',
  optimizationApplied: savedTokens > 0
}
}