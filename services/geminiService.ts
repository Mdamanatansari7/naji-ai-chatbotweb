import { GoogleGenerativeAI } from "@google/generative-ai"

// Gemini client initialize
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Streaming chat function
export async function* runChatStream(prompt: string): AsyncGenerator<string> {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Start streaming response
    const responseStream = await model.generateContentStream(prompt)

    for await (const chunk of responseStream.stream) {
      const text = chunk.text()
      if (text) {
        yield text
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    const errorMessage =
      error instanceof Error
        ? `Gemini API Error: ${error.message}`
        : "An unexpected error occurred while communicating with the Gemini API."
    throw new Error(errorMessage)
  }
}
