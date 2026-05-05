const { createAI } = require('./dist/index.js')
const dotenv = require('dotenv')
dotenv.config()

const ai = createAI({
  provider: 'openai',
  apiKey: process.env.apiKey
})

async function main() {
  // console.log('Testing chat...')
  // const chatResponse = await ai.chat('Say hello in one sentence')
  // console.log('chat:', chatResponse.text)

  // Test without optimization
  // console.log('--- Without Optimization ---')
  // const normal = await ai.chat('Could you please explain black holes in great detail, including how they form, what happens at the event horizon, and what scientists currently understand about what exists inside them?')
  // console.log('Response:', normal.text)
  // console.log('Optimization:', normal.optimization)

  // // Test with optimization
  // console.log('\n--- With Optimization ---')
  // const optimized = await ai.chat('Could you please explain black holes in great detail, including how they form, what happens at the event horizon, and what scientists currently understand about what exists inside them?', {
  //   optimize: true
  // })
  // console.log('Response:', optimized.text)
  // console.log('Optimization:', optimized.optimization)


 // Test string optimization
const stringResponse = await ai.chat(
  'Could you please help me write a function that sorts an array in order to make it more efficient?',
  { optimize: true }
)
console.log('String optimization:', stringResponse.optimization)

// Test object optimization  
const objectResponse = await ai.chat({
  task: "rank_candidates",
  candidates: [
    { name: "John Doe", role: "Frontend Engineer", skills: "React, TypeScript", experience: "3 years" },
    { name: "Jane Smith", role: "Frontend Engineer", skills: "Vue, JavaScript", experience: "2 years" },
  ]
}, { optimize: true })
console.log('Object optimization:', objectResponse.optimization)

  // console.log('\nTesting summarize...')
  // const summarizeResponse = await ai.summarize('Artificial intelligence is transforming industries across the world. From healthcare to finance, AI is being used to automate tasks, improve efficiency, and make better decisions. Many experts believe AI will be the most transformative technology of the 21st century.')
  // console.log('summarize:', summarizeResponse.text)

  // console.log('\nTesting generate...')
  // const generateResponse = await ai.generate('List 3 programming languages with their use cases')
  // console.log('generate:', generateResponse.text)

  // console.log('\nTesting stream...')
  // await ai.stream('Write a short poem about coding', (chunk) => {
  //   process.stdout.write(chunk)
  // })

  // console.log('\n\nTesting error handling...')
  // try {
  //   const badAI = createAI({
  //     provider: 'openai',
  //     apiKey: 'invalid-key'
  //   })
  //   await badAI.chat('Hello')
  // } catch (error) {
  //   console.log('Error caught correctly:', error.message)
  // }

  console.log('\nAll tests passed!')
}

main().catch(console.error)