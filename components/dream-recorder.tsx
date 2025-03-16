"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square, Loader2, Sparkles, Type } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function DreamRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [dreamText, setDreamText] = useState("")
  const [inputMethod, setInputMethod] = useState<"voice" | "text">("voice")
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        await transcribeDream(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      let seconds = 0
      timerRef.current = setInterval(() => {
        seconds++
        setRecordingTime(seconds)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record your dream.",
        variant: "destructive",
      })
      setInputMethod("text")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const transcribeDream = async (audioBlob: Blob) => {
    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("audio", audioBlob)

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to transcribe audio")
      }

      const data = await response.json()
      setDreamText(data.text)
    } catch (error) {
      console.error("Error transcribing dream:", error)
      toast({
        title: "Transcription failed",
        description: "We couldn't transcribe your dream. Please try again or type it manually.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const submitDream = async () => {
    if (!dreamText.trim()) {
      toast({
        title: "Empty dream",
        description: "Please record or type your dream before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/dreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: dreamText }),
      })

      if (!response.ok) {
        throw new Error("Failed to save dream")
      }

      const dream = await response.json()

      toast({
        title: "Dream saved",
        description: "Your dream is being visualized. You can now go back to sleep.",
      })

      // Clear the dream text
      setDreamText("")

      // In a real app, we would redirect to the dream detail page or update the UI
      // For now, we'll just show a success message
    } catch (error) {
      console.error("Error saving dream:", error)
      toast({
        title: "Couldn't save dream",
        description: "There was an error saving your dream. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-2">
        <div className="bg-blue-950/20 rounded-full p-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full px-3",
              inputMethod === "voice" ? "bg-purple-900/40 text-cyan-200" : "text-slate-400",
            )}
            onClick={() => setInputMethod("voice")}
          >
            <Mic className="h-4 w-4 mr-1" />
            Voice
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full px-3",
              inputMethod === "text" ? "bg-purple-900/40 text-cyan-200" : "text-slate-400",
            )}
            onClick={() => setInputMethod("text")}
          >
            <Type className="h-4 w-4 mr-1" />
            Text
          </Button>
        </div>
      </div>

      {inputMethod === "voice" ? (
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-2">
            <div
              className={cn(
                "absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300",
                isRecording ? "bg-red-500/20 animate-pulse" : isProcessing ? "bg-cyan-500/20" : "bg-blue-950/20",
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-16 w-16 rounded-full",
                  isRecording
                    ? "bg-red-500 text-white hover:bg-red-600 hover:text-white"
                    : isProcessing
                      ? "bg-cyan-500 text-white hover:bg-cyan-600"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 shadow-lg shadow-cyan-500/20",
                )}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : isRecording ? (
                  <Square className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
            </div>
            {isRecording && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 px-2 py-0.5 rounded-full text-xs text-red-400 border border-red-500/30">
                {formatTime(recordingTime)}
              </div>
            )}
          </div>
          <p className="text-sm text-cyan-300/80 mb-4">
            {isRecording
              ? "Recording... Tap to stop"
              : isProcessing
                ? "Processing your dream..."
                : "Tap to record your dream"}
          </p>
        </div>
      ) : null}

      <div className={cn(inputMethod === "text" || dreamText ? "block" : "hidden")}>
        <Textarea
          placeholder="Describe your dream here..."
          className="min-h-[120px] bg-blue-950/10 border-purple-900/20 text-cyan-100 placeholder:text-slate-500"
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
        />
      </div>

      {dreamText && (
        <div className="mt-4">
          <Button
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/10"
            onClick={submitDream}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Visualize Dream
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

