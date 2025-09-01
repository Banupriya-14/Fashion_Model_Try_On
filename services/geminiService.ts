
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateModelImage(base64ImageData: string, mimeType: string): Promise<string> {
    const model = 'gemini-2.5-flash-image-preview';
    
    const prompt = `Given the image of an Indian chudi set (top and pant), realistically place this complete outfit on a full-body fashion model. The model should be standing in a natural, elegant pose against a clean, minimalist studio background with soft, professional lighting. Ensure the clothing drapes naturally and realistically on the model's form.`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text)?.text;
            if (textPart) {
                 throw new Error(`API returned text instead of an image: ${textPart}`);
            }
            throw new Error("Image generation failed: No image data found in the response.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate image. Please check the console for more details.");
    }
}
