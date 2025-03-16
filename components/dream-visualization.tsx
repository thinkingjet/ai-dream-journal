"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface DreamVisualizationProps {
  dreamId: string
  initialImageUrl?: string
}

interface DreamData {
  id: string
  text: string
  imageUrl: string
  analysis: {
    themes: string[]
    symbols: string[]
    emotions: string[]
    interpretation: string
  }
  createdAt: string
}

export default function DreamVisualization({ dreamId, initialImageUrl }: DreamVisualizationProps) {
  const [dream, setDream] = useState<DreamData | null>(null)
  const [loading, setLoading] = useState(!initialImageUrl)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, we would fetch the dream data from the API
    // For now, we'll simulate a loading state and then show the image

    const timer = setTimeout(() => {
      setDream({
        id: dreamId,
        text: "Your dream is being visualized...",
        imageUrl: initialImageUrl || "/placeholder.svg?height=400&width=600",
        analysis: {
          themes: ["dream", "visualization"],
          symbols: ["image", "creativity"],
          emotions: ["curiosity", "wonder"],
          interpretation: "Your dream is being processed and analyzed.",
        },
        createdAt: new Date().toISOString(),
      })
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [dreamId, initialImageUrl])

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 text-red-300">
        <p>Error loading dream visualization: {error}</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/30 border border-indigo-900/30 rounded-lg overflow-hidden">
      <div className="relative w-full h-64 sm:h-80">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
            <div className="text-center">
              <Sparkles className="h-8 w-8 text-indigo-400 mx-auto mb-2 animate-pulse" />
              <p className="text-indigo-300 text-sm">Visualizing your dream...</p>
            </div>
          </div>
        ) : dream?.imageUrl ? (
          <Image src={dream.imageUrl || "/placeholder.svg"} alt="Dream visualization" fill className="object-cover" />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>

      <div className="p-4">
        {loading ? (
          <>
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </>
        ) : dream ? (
          <>
            <div className="flex flex-wrap gap-2 mb-2">
              {dream.analysis.themes.map((theme) => (
                <Badge key={theme} variant="outline" className="bg-indigo-900/30 text-indigo-300 border-indigo-800">
                  {theme}
                </Badge>
              ))}
              {dream.analysis.emotions.map((emotion) => (
                <Badge key={emotion} variant="outline" className="bg-pink-900/30 text-pink-300 border-pink-800">
                  {emotion}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-indigo-200">{dream.analysis.interpretation}</p>
          </>
        ) : null}
      </div>
    </div>
  )
}

