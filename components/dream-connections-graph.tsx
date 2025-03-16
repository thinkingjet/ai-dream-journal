"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import ForceGraph2D with no SSR to avoid the AFRAME error
const ForceGraph2D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph2D),
  { ssr: false }
)

// This would normally be fetched from an API
const mockGraphData = {
  nodes: [
    // Dreams
    { id: "dream1", name: "Crystal City Flight", group: 1, val: 12, type: "dream", dreamId: "1" },
    { id: "dream2", name: "The Infinite Library", group: 1, val: 12, type: "dream", dreamId: "2" },
    { id: "dream3", name: "Ocean of Stars", group: 1, val: 12, type: "dream", dreamId: "3" },
    { id: "dream4", name: "The Glass Forest Symphony", group: 1, val: 12, type: "dream", dreamId: "4" },
    { id: "dream5", name: "The Backwards City", group: 1, val: 12, type: "dream", dreamId: "5" },
    { id: "dream6", name: "The Animal Court Feast", group: 1, val: 12, type: "dream", dreamId: "6" },
    
    // Themes
    { id: "theme1", name: "Flying", group: 2, val: 8, type: "theme" },
    { id: "theme2", name: "Fantasy", group: 2, val: 8, type: "theme" },
    { id: "theme3", name: "Knowledge", group: 2, val: 8, type: "theme" },
    { id: "theme4", name: "Mystery", group: 2, val: 8, type: "theme" },
    { id: "theme5", name: "Space", group: 2, val: 8, type: "theme" },
    { id: "theme6", name: "Cosmic", group: 2, val: 8, type: "theme" },
    { id: "theme7", name: "Nature", group: 2, val: 8, type: "theme" },
    { id: "theme8", name: "Music", group: 2, val: 8, type: "theme" },
    { id: "theme9", name: "Time", group: 2, val: 8, type: "theme" },
    { id: "theme10", name: "Transformation", group: 2, val: 8, type: "theme" },
    { id: "theme11", name: "Animals", group: 2, val: 8, type: "theme" },
    { id: "theme12", name: "Medieval", group: 2, val: 8, type: "theme" },
    
    // Symbols
    { id: "symbol1", name: "Crystal/Glass", group: 3, val: 7, type: "symbol" },
    { id: "symbol2", name: "Stars", group: 3, val: 7, type: "symbol" },
    { id: "symbol3", name: "Books", group: 3, val: 7, type: "symbol" },
    { id: "symbol4", name: "Light Beings", group: 3, val: 7, type: "symbol" },
    { id: "symbol5", name: "Music", group: 3, val: 7, type: "symbol" },
    { id: "symbol6", name: "Clock/Time", group: 3, val: 7, type: "symbol" },
    { id: "symbol7", name: "Animals in Clothing", group: 3, val: 7, type: "symbol" },
    
    // Emotions
    { id: "emotion1", name: "Wonder", group: 4, val: 6, type: "emotion" },
    { id: "emotion2", name: "Freedom", group: 4, val: 6, type: "emotion" },
    { id: "emotion3", name: "Curiosity", group: 4, val: 6, type: "emotion" },
    { id: "emotion4", name: "Peace", group: 4, val: 6, type: "emotion" },
    { id: "emotion5", name: "Connection", group: 4, val: 6, type: "emotion" },
    { id: "emotion6", name: "Confusion", group: 4, val: 6, type: "emotion" },
    { id: "emotion7", name: "Acceptance", group: 4, val: 6, type: "emotion" },
  ],
  links: [
    // Dream 1 - Crystal City Flight
    { source: "dream1", target: "theme1", value: 1 },
    { source: "dream1", target: "theme2", value: 1 },
    { source: "dream1", target: "symbol1", value: 1 },
    { source: "dream1", target: "symbol2", value: 1 },
    { source: "dream1", target: "emotion1", value: 1 },
    { source: "dream1", target: "emotion2", value: 1 },
    { source: "dream1", target: "dream3", value: 0.7 }, // Similar dreams
    { source: "dream1", target: "dream5", value: 0.7 },
    
    // Dream 2 - The Infinite Library
    { source: "dream2", target: "theme3", value: 1 },
    { source: "dream2", target: "theme4", value: 1 },
    { source: "dream2", target: "symbol3", value: 1 },
    { source: "dream2", target: "emotion3", value: 1 },
    { source: "dream2", target: "dream6", value: 0.7 }, // Similar dreams
    { source: "dream2", target: "dream3", value: 0.7 },
    
    // Dream 3 - Ocean of Stars
    { source: "dream3", target: "theme5", value: 1 },
    { source: "dream3", target: "theme6", value: 1 },
    { source: "dream3", target: "symbol2", value: 1 },
    { source: "dream3", target: "symbol4", value: 1 },
    { source: "dream3", target: "emotion4", value: 1 },
    { source: "dream3", target: "emotion5", value: 1 },
    { source: "dream3", target: "dream1", value: 0.7 }, // Similar dreams
    { source: "dream3", target: "dream2", value: 0.7 },
    
    // Dream 4 - The Glass Forest Symphony
    { source: "dream4", target: "theme7", value: 1 },
    { source: "dream4", target: "theme8", value: 1 },
    { source: "dream4", target: "symbol1", value: 1 },
    { source: "dream4", target: "symbol5", value: 1 },
    { source: "dream4", target: "emotion1", value: 1 },
    { source: "dream4", target: "emotion5", value: 1 },
    { source: "dream4", target: "dream6", value: 0.7 }, // Similar dreams
    { source: "dream4", target: "dream5", value: 0.7 },
    
    // Dream 5 - The Backwards City
    { source: "dream5", target: "theme9", value: 1 },
    { source: "dream5", target: "symbol6", value: 1 },
    { source: "dream5", target: "emotion6", value: 1 },
    { source: "dream5", target: "dream1", value: 0.7 }, // Similar dreams
    { source: "dream5", target: "dream4", value: 0.7 },
    
    // Dream 6 - The Animal Court Feast
    { source: "dream6", target: "theme10", value: 1 },
    { source: "dream6", target: "theme11", value: 1 },
    { source: "dream6", target: "theme12", value: 1 },
    { source: "dream6", target: "symbol7", value: 1 },
    { source: "dream6", target: "emotion3", value: 1 },
    { source: "dream6", target: "emotion7", value: 1 },
    { source: "dream6", target: "dream2", value: 0.7 }, // Similar dreams
    { source: "dream6", target: "dream4", value: 0.7 },
    
    // Cross-connections between themes and symbols
    { source: "theme1", target: "emotion2", value: 0.5 },
    { source: "theme6", target: "theme5", value: 0.5 },
    { source: "theme3", target: "symbol3", value: 0.5 },
    { source: "theme7", target: "symbol1", value: 0.5 },
    { source: "theme9", target: "symbol6", value: 0.5 },
    { source: "theme11", target: "symbol7", value: 0.5 },
  ],
}

// Color mapping for different node types
const nodeColors = {
  dream: "#4f46e5", // indigo-600
  theme: "#0891b2", // cyan-600
  symbol: "#7c3aed", // violet-600
  emotion: "#db2777", // pink-600
}

export default function DreamConnectionsGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<any>(null)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Ensure the graph resizes when the window resizes
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        containerRef.current.style.width = `${width}px`
        containerRef.current.style.height = `${height}px`
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
        <div className="text-cyan-300">Loading dream connections...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full">
        <ForceGraph2D
          graphData={mockGraphData}
          nodeRelSize={6}
          nodeVal={(node) => node.val}
          linkWidth={(link) => link.value * 2}
          linkColor={(link) => {
            const sourceType = (link.source as any).type || 'default'
            const targetType = (link.target as any).type || 'default'
            
            if (sourceType === 'dream' && targetType === 'dream') {
              return "rgba(79, 70, 229, 0.3)" // indigo connection
            } else if (sourceType === 'theme' || targetType === 'theme') {
              return "rgba(8, 145, 178, 0.3)" // cyan connection
            } else if (sourceType === 'symbol' || targetType === 'symbol') {
              return "rgba(124, 58, 237, 0.3)" // violet connection
            } else if (sourceType === 'emotion' || targetType === 'emotion') {
              return "rgba(219, 39, 119, 0.3)" // pink connection
            }
            
            return "rgba(148, 163, 184, 0.3)" // slate-400 default
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name as string
            const fontSize = 12 / globalScale
            ctx.font = `${fontSize}px Sans-Serif`
            const textWidth = ctx.measureText(label).width
            const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.8) as [number, number]

            // Node circle
            ctx.beginPath()
            ctx.arc(node.x as number, node.y as number, node.val as number, 0, 2 * Math.PI)
            ctx.fillStyle = nodeColors[node.type as keyof typeof nodeColors] || "#94a3b8"
            ctx.fill()
            
            // Draw node label if zoomed in or node is hovered
            if (globalScale > 0.8 || node === hoveredNode) {
              ctx.fillStyle = "rgba(15, 23, 42, 0.8)" // slate-900 with opacity
              ctx.fillRect(
                (node.x as number) - bckgDimensions[0] / 2,
                (node.y as number) - bckgDimensions[1] / 2 - 4,
                bckgDimensions[0],
                bckgDimensions[1]
              )
              
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillStyle = "#f8fafc" // slate-50
              ctx.fillText(label, node.x as number, node.y as number)
            }
          }}
          onNodeHover={setHoveredNode}
          onNodeClick={(node) => {
            if (node.type === 'dream' && node.dreamId) {
              router.push(`/dreams/${node.dreamId}`)
            }
          }}
          cooldownTicks={100}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={(link) => link.value * 2}
          linkDirectionalParticleSpeed={0.005}
          backgroundColor="rgba(0,0,0,0)"
        />
      </div>
      
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-white text-sm max-w-xs">
          <div className="font-medium mb-1">{hoveredNode.name}</div>
          <div className="text-xs text-slate-300">
            {hoveredNode.type === 'dream' ? 'Click to view dream details' : 
             `Type: ${hoveredNode.type.charAt(0).toUpperCase() + hoveredNode.type.slice(1)}`}
          </div>
        </div>
      )}
      
      <div className="absolute top-4 right-4 bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-white text-xs">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>
            <span>Dreams</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-cyan-600 mr-2"></span>
            <span>Themes</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-violet-600 mr-2"></span>
            <span>Symbols</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-pink-600 mr-2"></span>
            <span>Emotions</span>
          </div>
        </div>
      </div>
    </div>
  )
}

