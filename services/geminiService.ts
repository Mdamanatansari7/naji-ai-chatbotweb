import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function* runChatStream(prompt: string): AsyncGenerator<string> {
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    for await (const chunk of responseStream) {
      // Using the recommended .text property to extract the response.
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const errorMessage = error instanceof Error ? `Gemini API Error: ${error.message}` : "An unexpected error occurred while communicating with the Gemini API.";
    throw new Error(errorMessage);
  }
}
