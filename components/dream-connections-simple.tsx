"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// Dream data
const dreams = [
  {
    id: "1",
    title: "Crystal City Flight",
    imageUrl: "/images/1.jpeg",
    themes: ["Flying", "Fantasy"],
    symbols: ["Crystal/Glass", "Stars"],
    emotions: ["Wonder", "Freedom"],
    connections: ["Ocean of Stars", "The Backwards City"]
  },
  {
    id: "2",
    title: "The Infinite Library",
    imageUrl: "/images/2.jpeg",
    themes: ["Knowledge", "Mystery"],
    symbols: ["Books"],
    emotions: ["Curiosity"],
    connections: ["The Animal Court Feast", "Ocean of Stars"]
  },
  {
    id: "3",
    title: "Ocean of Stars",
    imageUrl: "/images/3.jpeg",
    themes: ["Space", "Cosmic"],
    symbols: ["Stars", "Light Beings"],
    emotions: ["Peace", "Connection"],
    connections: ["Crystal City Flight", "The Infinite Library"]
  },
  {
    id: "4",
    title: "The Glass Forest Symphony",
    imageUrl: "/images/4.jpeg",
    themes: ["Nature", "Music"],
    symbols: ["Crystal/Glass", "Music"],
    emotions: ["Wonder", "Connection"],
    connections: ["The Animal Court Feast", "The Backwards City"]
  },
  {
    id: "5",
    title: "The Backwards City",
    imageUrl: "/images/5.jpeg",
    themes: ["Time"],
    symbols: ["Clock/Time"],
    emotions: ["Confusion"],
    connections: ["Crystal City Flight", "The Glass Forest Symphony"]
  },
  {
    id: "6",
    title: "The Animal Court Feast",
    imageUrl: "/images/6.jpeg",
    themes: ["Transformation", "Animals", "Medieval"],
    symbols: ["Animals in Clothing"],
    emotions: ["Curiosity", "Acceptance"],
    connections: ["The Infinite Library", "The Glass Forest Symphony"]
  }
]

// Color mapping for different categories
const categoryColors = {
  dream: "bg-indigo-600",
  theme: "bg-cyan-600",
  symbol: "bg-violet-600",
  emotion: "bg-pink-600"
}

export default function DreamConnectionsSimple() {
  const [selectedDream, setSelectedDream] = useState<string | null>(null)
  
  const handleDreamClick = (dreamId: string) => {
    setSelectedDream(dreamId === selectedDream ? null : dreamId)
  }
  
  return (
    <div className="w-full h-full overflow-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dreams.map((dream) => (
          <div 
            key={dream.id}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedDream === dream.id 
                ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/20' 
                : selectedDream && dream.connections.includes(dreams.find(d => d.id === selectedDream)?.title || '')
                  ? 'ring-2 ring-purple-400 shadow-lg shadow-purple-400/20'
                  : 'hover:ring-1 hover:ring-cyan-400/50'
            }`}
            onClick={() => handleDreamClick(dream.id)}
          >
            <div className="relative h-32 w-full">
              <Image
                src={dream.imageUrl}
                alt={dream.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3">
                <h3 className="text-white font-medium">{dream.title}</h3>
              </div>
            </div>
            
            <div className="p-3 bg-slate-900/80">
              <div className="flex flex-wrap gap-1 mb-2">
                {dream.themes.map((theme) => (
                  <span key={theme} className="text-xs px-2 py-0.5 rounded-full bg-cyan-600/30 text-cyan-300">
                    {theme}
                  </span>
                ))}
                {dream.symbols.map((symbol) => (
                  <span key={symbol} className="text-xs px-2 py-0.5 rounded-full bg-violet-600/30 text-violet-300">
                    {symbol}
                  </span>
                ))}
              </div>
              
              {selectedDream === dream.id && (
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  <p className="text-xs text-slate-300 mb-2">Connected to:</p>
                  <div className="flex flex-wrap gap-1">
                    {dream.connections.map((connection) => (
                      <span key={connection} className="text-xs px-2 py-0.5 rounded-full bg-purple-600/30 text-purple-300">
                        {connection}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Link 
                      href={`/dreams/${dream.id}`}
                      className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      View full dream →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {selectedDream && selectedDream !== dream.id && dream.connections.includes(dreams.find(d => d.id === selectedDream)?.title || '') && (
              <div className="absolute top-2 right-2">
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Connected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
        <h3 className="text-cyan-300 font-medium mb-3">How to use this visualization</h3>
        <ul className="text-sm text-cyan-100/80 space-y-2">
          <li>• Click on any dream card to see its connections</li>
          <li>• Connected dreams will be highlighted with a purple border</li>
          <li>• Click on a highlighted dream to explore its connections</li>
          <li>• Click "View full dream" to see the complete dream details</li>
        </ul>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>
          <span className="text-xs text-cyan-100">Dreams</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-cyan-600 mr-2"></span>
          <span className="text-xs text-cyan-100">Themes</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-violet-600 mr-2"></span>
          <span className="text-xs text-cyan-100">Symbols</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-pink-600 mr-2"></span>
          <span className="text-xs text-cyan-100">Emotions</span>
        </div>
      </div>
    </div>
  )
} 