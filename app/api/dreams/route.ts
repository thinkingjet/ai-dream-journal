import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Dream text is required" }, { status: 400 })
    }

    // 1. Generate an image using Gemini 2.0
    const imageUrl = await generateDreamImage(text)

    // 2. Analyze the dream for connections using deepseek via OpenRouter
    const analysis = await analyzeDream(text)

    // In a real app, we would save the dream to a database here
    // For now, we'll just return the generated data

    return NextResponse.json({
      id: Date.now().toString(),
      text,
      imageUrl,
      analysis,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in dreams API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function generateDreamImage(text: string): Promise<string> {
  try {
    // Call Gemini 2.0 API for image generation
    const prompt = `Create a dreamlike, surreal image based on this dream description: ${text}. The image should be ethereal, with soft colors and a mystical quality.`

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      // Return a placeholder image if the API call fails
      return "/placeholder.svg?height=400&width=600"
    }

    const data = await response.json()

    // Extract the image URL from the response
    // Note: In a real implementation, you would need to handle the actual image data
    // from Gemini and either save it to a storage service or return a data URL
    // For now, we'll return a placeholder

    return "/placeholder.svg?height=400&width=600"
  } catch (error) {
    console.error("Error generating dream image:", error)
    // Return a placeholder image if there's an error
    return "/placeholder.svg?height=400&width=600"
  }
}

async function analyzeDream(text: string): Promise<any> {
  try {
    // Call OpenRouter API with deepseek-coder model for dream analysis
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://fable-flow.vercel.app", // Replace with your actual domain
        "X-Title": "Fable Flow Dream Analyzer",
      },
      body: JSON.stringify({
        model: "deepseek-ai/deepseek-coder-33b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a dream analyst. Analyze the dream description and extract themes, symbols, emotions, and provide a brief interpretation. Format your response as JSON.",
          },
          {
            role: "user",
            content: `Analyze this dream and return a JSON object with themes (array of strings), symbols (array of strings), emotions (array of strings), and interpretation (string): ${text}`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenRouter API error:", errorText)
      // Return default analysis if the API call fails
      return {
        themes: ["unknown"],
        symbols: ["unknown"],
        emotions: ["unknown"],
        interpretation: "Unable to analyze the dream at this time.",
      }
    }

    const data = await response.json()
    const analysisText = data.choices[0]?.message?.content || "{}"

    try {
      // Parse the JSON response
      const analysis = JSON.parse(analysisText)
      return {
        themes: analysis.themes || [],
        symbols: analysis.symbols || [],
        emotions: analysis.emotions || [],
        interpretation: analysis.interpretation || "No interpretation available.",
      }
    } catch (parseError) {
      console.error("Error parsing analysis JSON:", parseError)
      // Return default analysis if parsing fails
      return {
        themes: ["dream"],
        symbols: ["subconscious"],
        emotions: ["curiosity"],
        interpretation: "This dream reflects elements of your subconscious mind.",
      }
    }
  } catch (error) {
    console.error("Error analyzing dream:", error)
    // Return default analysis if there's an error
    return {
      themes: ["dream"],
      symbols: ["subconscious"],
      emotions: ["curiosity"],
      interpretation: "This dream reflects elements of your subconscious mind.",
    }
  }
}

