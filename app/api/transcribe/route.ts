import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Convert the file to an ArrayBuffer
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Call Deepgram API
    const response = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&language=en&smart_format=true", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": audioFile.type,
      },
      body: buffer,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Deepgram API error:", errorText)
      return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 })
    }

    const data = await response.json()
    const transcription = data.results?.channels[0]?.alternatives[0]?.transcript || ""

    return NextResponse.json({ text: transcription })
  } catch (error) {
    console.error("Error in transcribe API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

