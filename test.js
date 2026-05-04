const { createAI } = require('./dist/index.js')
const dotenv = require('dotenv')
dotenv.config()

const ai = createAI({
  provider: 'openai',
  apiKey: process.env.apiKey
})

async function main() {
  console.log('Testing chat...')
  const chatResponse = await ai.chat('Say hello in one sentence')
  console.log('chat:', chatResponse.text)

  console.log('\nTesting summarize...')
  const summarizeResponse = await ai.summarize('Artificial intelligence is transforming industries across the world. From healthcare to finance, AI is being used to automate tasks, improve efficiency, and make better decisions. Many experts believe AI will be the most transformative technology of the 21st century.')
  console.log('summarize:', summarizeResponse.text)

  console.log('\nTesting generate...')
  const generateResponse = await ai.generate('List 3 programming languages with their use cases')
  console.log('generate:', generateResponse.text)

  console.log('\nTesting stream...')
  await ai.stream('Write a short poem about coding', (chunk) => {
    process.stdout.write(chunk)
  })

  console.log('\n\nTesting error handling...')
  try {
    const badAI = createAI({
      provider: 'openai',
      apiKey: 'invalid-key'
    })
    await badAI.chat('Hello')
  } catch (error) {
    console.log('Error caught correctly:', error.message)
  }

  console.log('\nAll tests passed!')
}

main().catch(console.error)