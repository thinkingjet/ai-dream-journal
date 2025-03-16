"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Network, Sparkles, Brain, Lightbulb, Repeat } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import React from "react"

// Dynamically import the components with no SSR
const DreamConnectionsGraph = dynamic(
  () => import("@/components/dream-connections-graph"),
  { ssr: false }
)

const DreamConnectionsSimple = dynamic(
  () => import("@/components/dream-connections-simple"),
  { ssr: false }
)

// Fallback component in case the graph fails to load
function GraphFallback() {
  return (
    <div className="h-[500px] w-full bg-slate-900/50 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <Network className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <p className="text-cyan-300 font-medium mb-2">Dream Connections Map</p>
        <p className="text-cyan-200/70 text-sm max-w-md mx-auto">
          Visualizing connections between your dreams, themes, symbols, and emotions.
        </p>
      </div>
    </div>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default function ConnectionsPageClient() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-purple-950/30 to-black text-white bg-stars">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-cyan-300 hover:text-cyan-200 hover:bg-blue-950/40"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Dream Connections</h1>
          </div>

          <p className="text-cyan-200/80 max-w-2xl">
            Discover patterns and recurring themes in your dreams. Our AI analyzes your dream journal to find
            connections between symbols, emotions, and narratives, revealing the hidden architecture of your subconscious mind.
          </p>
        </header>

        <div className="grid gap-6">
          <Card className="bg-blue-950/10 border-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-300">
                <Network className="h-5 w-5 mr-2 text-purple-400" />
                Dream Connections Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<GraphFallback />}>
                <div className="h-[500px] w-full bg-slate-900/50 rounded-lg overflow-hidden">
                  <ErrorBoundary fallback={<DreamConnectionsSimple />}>
                    <DreamConnectionsGraph />
                  </ErrorBoundary>
                </div>
              </Suspense>
              <div className="mt-4 text-sm text-cyan-200/70">
                <p>Interact with the map to explore connections. Hover over nodes to see details, and click on dream nodes to view the full dream.</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-950/10 border-purple-900/20">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                  Common Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { name: "Fantasy", count: 6, color: "bg-indigo-900/50 text-indigo-300", description: "Magical elements and fantastical settings appear in all your dreams" },
                    { name: "Transformation", count: 4, color: "bg-purple-900/50 text-purple-300", description: "Change and metamorphosis are recurring elements" },
                    { name: "Cosmic/Space", count: 3, color: "bg-blue-900/50 text-blue-300", description: "Celestial imagery and cosmic awareness" },
                    { name: "Knowledge Seeking", count: 3, color: "bg-amber-900/50 text-amber-300", description: "Pursuit of wisdom and understanding" },
                  ].map((theme) => (
                    <li key={theme.name} className="bg-blue-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-cyan-100 font-medium">{theme.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${theme.color}`}>{theme.count} dreams</span>
                      </div>
                      <p className="text-xs text-cyan-200/70">{theme.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-950/10 border-purple-900/20">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-purple-400" />
                  Recurring Symbols
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { name: "Stars", count: 3, color: "bg-yellow-900/50 text-yellow-300", description: "Represent guidance, inspiration, and cosmic connection" },
                    { name: "Crystal/Glass", count: 3, color: "bg-cyan-900/50 text-cyan-300", description: "Symbolize clarity, fragility, and transparency" },
                    { name: "Books", count: 2, color: "bg-emerald-900/50 text-emerald-300", description: "Represent knowledge, stories, and recorded wisdom" },
                    { name: "Light Beings", count: 2, color: "bg-pink-900/50 text-pink-300", description: "Symbolize guidance, higher consciousness, and transformation" },
                  ].map((symbol) => (
                    <li key={symbol.name} className="bg-blue-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-cyan-100 font-medium">{symbol.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${symbol.color}`}>{symbol.count} dreams</span>
                      </div>
                      <p className="text-xs text-cyan-200/70">{symbol.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-950/10 border-purple-900/20">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-purple-400" />
                  Emotional Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { name: "Wonder", count: 5, color: "bg-violet-900/50 text-violet-300", description: "Sense of awe and amazement at dream experiences" },
                    { name: "Connection", count: 4, color: "bg-pink-900/50 text-pink-300", description: "Feeling of being part of something larger" },
                    { name: "Curiosity", count: 3, color: "bg-blue-900/50 text-blue-300", description: "Desire to explore and understand" },
                    { name: "Freedom", count: 2, color: "bg-emerald-900/50 text-emerald-300", description: "Sense of liberation and transcendence" },
                  ].map((emotion) => (
                    <li key={emotion.name} className="bg-blue-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-cyan-100 font-medium">{emotion.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${emotion.color}`}>{emotion.count} dreams</span>
                      </div>
                      <p className="text-xs text-cyan-200/70">{emotion.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-950/10 border-purple-900/20">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300 flex items-center">
                  <Repeat className="h-4 w-4 mr-2 text-purple-400" />
                  Strong Dream Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { 
                      dreams: "Crystal City Flight & Ocean of Stars", 
                      strength: "Strong", 
                      color: "bg-indigo-900/50 text-indigo-300",
                      description: "Connected through cosmic imagery and feelings of transcendence" 
                    },
                    { 
                      dreams: "The Infinite Library & Ocean of Stars", 
                      strength: "Strong", 
                      color: "bg-indigo-900/50 text-indigo-300",
                      description: "Both feature repositories of cosmic knowledge and wisdom" 
                    },
                    { 
                      dreams: "The Glass Forest & The Animal Court", 
                      strength: "Medium", 
                      color: "bg-purple-900/50 text-purple-300",
                      description: "Connected through transformation themes and natural elements" 
                    },
                    { 
                      dreams: "The Backwards City & Crystal City", 
                      strength: "Medium", 
                      color: "bg-purple-900/50 text-purple-300",
                      description: "Both feature unusual cities with altered physics/reality" 
                    },
                  ].map((connection, index) => (
                    <li key={index} className="bg-blue-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-cyan-100 font-medium">{connection.dreams}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${connection.color}`}>{connection.strength}</span>
                      </div>
                      <p className="text-xs text-cyan-200/70">{connection.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-950/10 border-purple-900/20">
            <CardHeader>
              <CardTitle className="text-lg text-cyan-300">Dream Narrative Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-cyan-100 mb-4">
                Your dreams show a consistent narrative universe with interconnected elements. The cosmic library from "The Infinite Library" appears in a different form in "Ocean of Stars," suggesting your subconscious is building a coherent dreamworld.
              </p>
              <p className="text-cyan-100 mb-4">
                Transformation is a key theme across multiple dreams, from the physical transformations in "The Animal Court Feast" to the environmental transformations in "Crystal City Flight" and "The Glass Forest Symphony."
              </p>
              <p className="text-cyan-100">
                The recurring themes of knowledge-seeking and cosmic awareness suggest a period of personal growth and expanding consciousness. Your dreams frequently feature guides (the librarian, the old woman, the fox king) who help navigate unfamiliar territories.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 