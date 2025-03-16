import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Calendar, Clock, MessageSquare, Share2, Bookmark } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { notFound } from "next/navigation"

// This would normally be fetched from an API
const mockDreams = [
  {
    id: "1",
    title: "Crystal City Flight",
    text: "I was flying over a city made of crystal, with rainbow bridges connecting floating islands. The sky was purple and filled with stars even though it was daytime. I could feel the wind in my hair and the sensation of weightlessness. As I flew closer to one of the islands, I noticed people with translucent wings like dragonflies. They beckoned me to join them in a dance that spiraled up toward the largest crystal spire. As we danced, our movements created ripples of light that spread throughout the city, causing the buildings to change colors in harmony with our emotions. I felt a profound sense of belonging and freedom I've never experienced in waking life.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    imageUrl: "/images/1.jpeg",
    tags: ["flying", "fantasy", "city", "magical"],
    analysis: {
      themes: "Freedom, transcendence, community, harmony with environment",
      symbols: "Crystal city (clarity, purity), flying (liberation, transcending limitations), translucent wings (transformation, evolution), changing colors (emotional resonance)",
      emotions: "Weightlessness, joy, belonging, freedom, wonder",
      interpretation: "This dream suggests a desire for freedom from conventional limitations and a yearning for a community where you can express your authentic self. The crystal structures represent clarity of purpose, while flying symbolizes transcending everyday constraints. The changing colors responding to emotions indicates a wish for an environment that's responsive to and in harmony with your inner state. This dream may be encouraging you to seek spaces where you feel this sense of belonging and acceptance."
    },
    similarDreams: ["3", "5"]
  },
  {
    id: "2",
    title: "The Infinite Library",
    text: "I was in an ancient library where the books could talk. They were telling me secrets about the universe, but I could only remember fragments when I woke up. The library seemed infinite, with shelves stretching up beyond what I could see. Some books floated in the air, their pages turning by themselves. An old librarian with glowing eyes guided me through hidden sections. He showed me a book that contained my entire life story, including parts that hadn't happened yet. When I tried to read ahead to my future, the librarian gently closed the book and said, 'Some knowledge isn't meant for now.' He then led me to a cosmic section where the books were made of starlight and contained the histories of other worlds and dimensions.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    imageUrl: "/images/2.jpeg",
    tags: ["knowledge", "fantasy", "mystery", "books"],
    analysis: {
      themes: "Knowledge seeking, cosmic awareness, fate vs. free will, hidden wisdom",
      symbols: "Library (collective knowledge, subconscious), talking books (inner wisdom), librarian (higher self or guide), book of life (personal destiny)",
      emotions: "Curiosity, wonder, slight frustration at forgetting, acceptance",
      interpretation: "This dream reflects a deep desire for knowledge and understanding of your life's purpose. The infinite library represents the vast reservoir of wisdom available to you, while the talking books suggest that this knowledge can come through intuition rather than just rational thought. The librarian stopping you from reading your future points to the importance of living in the present rather than fixating on what's to come. The cosmic section with books made of starlight suggests that you're opening up to broader spiritual or philosophical perspectives that transcend ordinary understanding."
    },
    similarDreams: ["6", "3"]
  },
  {
    id: "3",
    title: "Ocean of Stars",
    text: "I was swimming in an ocean of stars. Each time I touched a star, it turned into a small creature that would follow me. By the end, I had an entire galaxy of little light beings swimming with me. They communicated through pulses of light and showed me constellations that told stories of ancient civilizations. I could breathe underwater and felt completely at peace. The creatures led me to an underwater temple made of black stone and starlight. Inside, I found a cosmic library similar to the one in my previous dream, but this one contained knowledge recorded in light patterns rather than books. The creatures taught me how to read these patterns by becoming one with the light.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    imageUrl: "/images/3.jpeg",
    tags: ["space", "swimming", "creatures", "cosmic"],
    analysis: {
      themes: "Connection, transformation, ancient wisdom, cosmic consciousness",
      symbols: "Ocean (collective unconscious, emotions), stars (guidance, inspiration), light creatures (transformed energy, helpers), underwater temple (sacred space in the depths of consciousness)",
      emotions: "Peace, wonder, connection, curiosity",
      interpretation: "This dream suggests a growing spiritual awareness and connection to something larger than yourself. Swimming in an ocean of stars represents immersion in cosmic consciousness while still maintaining your individual identity. The transformation of stars into creatures that follow you indicates your ability to transform inspiration into companions or guides on your journey. The underwater temple and cosmic library connect to your previous dream, suggesting that you're building a consistent inner world where wisdom is accessible through different means. The ability to breathe underwater shows comfort with exploring emotional or subconscious depths."
    },
    similarDreams: ["1", "2"]
  },
  {
    id: "4",
    title: "The Glass Forest Symphony",
    text: "I was in a forest where the trees were made of glass. When the wind blew, they made beautiful music. I could control the wind with my hands, creating different melodies. The forest floor was covered in luminescent moss that lit up with each step I took. Small glass birds flew between the branches, their wings creating tinkling sounds like wind chimes. As I ventured deeper into the forest, I discovered a clearing with a glass tree larger than all the others. Its roots extended far into the ground, visible through the transparent soil. When I placed my hand on its trunk, I could feel the vibrations of music coming from deep within the earth. The tree showed me visions of how all living things on the planet were connected through an invisible network of energy, similar to how the trees in this forest were connected through their music.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    imageUrl: "/images/4.jpeg",
    tags: ["nature", "music", "control", "glass"],
    analysis: {
      themes: "Harmony with nature, creative expression, interconnectedness, hidden networks",
      symbols: "Glass trees (beauty and fragility of nature), music (harmony, creative expression), luminescent moss (illumination of path), transparent soil (seeing beyond the surface)",
      emotions: "Wonder, creative joy, connection, reverence",
      interpretation: "This dream reflects a desire to connect with and influence your environment in a harmonious way. The ability to control the wind to create music suggests a wish to direct your creative energies productively. The glass composition of the forest highlights both the beauty and fragility of natural systems. The large tree showing you the connections between all living things represents an awakening to ecological or spiritual interconnectedness—a recognition that individual actions affect the whole. The transparent soil suggests a desire to see beyond surface appearances to the root systems that connect all things."
    },
    similarDreams: ["6", "5"]
  },
  {
    id: "5",
    title: "The Backwards City",
    text: "I found myself in a city where time flowed backwards. People walked in reverse, conversations happened end to beginning, and I watched buildings being dismantled brick by brick until they disappeared. I tried to communicate with the residents, but they couldn't understand me since I was moving forward in time while they moved backward. Eventually, I met an old woman who was also moving forward in time like me. She explained that she had been trapped in this reverse city for decades and had learned to navigate its strange logic. She showed me how certain actions could temporarily sync me with the backwards flow, allowing me to interact with the residents. Together, we discovered a clock tower at the center of the city that controlled the direction of time. By adjusting its mechanisms, we were able to normalize time flow in small pockets of the city, creating safe havens where people could choose which temporal direction to experience.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    imageUrl: "/images/5.jpeg",
    tags: ["time", "city", "confusion", "reverse"],
    analysis: {
      themes: "Time perception, alienation, adaptation, finding allies in strange circumstances",
      symbols: "Backwards city (feeling out of sync with others), old woman (wisdom, experience), clock tower (control over time perception)",
      emotions: "Confusion, frustration, curiosity, accomplishment",
      interpretation: "This dream reflects feelings of being out of sync with the world around you—perhaps you feel you're moving in a different direction than most people in your life. The inability to communicate with residents suggests frustration with not being understood by others. Meeting the old woman represents finding a mentor or ally who shares your perspective and can help you navigate challenging social environments. The clock tower symbolizes the possibility of creating balance between different approaches to life, suggesting that you're seeking ways to harmonize your unique perspective with conventional thinking rather than completely conforming or remaining isolated."
    },
    similarDreams: ["1", "4"]
  },
  {
    id: "6",
    title: "The Animal Court Feast",
    text: "I was attending a feast in a medieval castle, but all the guests were animals dressed in elaborate clothing. I was the only human present, yet no one seemed to notice. The food kept changing every time I looked away - from roast meats to live butterflies to glowing fruits I'd never seen before. A fox in royal attire kept asking me riddles I couldn't answer. When I failed to solve the third riddle, the fox announced that I must provide entertainment for the court instead. Not knowing what else to do, I began telling stories about my other dreams—about the crystal city, the star ocean, and the glass forest. The animal guests were entranced, and as I spoke, some of them began to transform, showing human features beneath their animal aspects. The fox king revealed that this realm existed at the intersection of all dreamworlds, and that my stories were creating bridges between different dream dimensions. He gave me a small golden key and told me it would allow me to return to this nexus point whenever I wished to travel between my dreams.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
    imageUrl: "/images/6.jpeg",
    tags: ["animals", "feast", "medieval", "transformation"],
    analysis: {
      themes: "Identity, transformation, storytelling power, connecting different aspects of self",
      symbols: "Animals in clothing (aspects of self or others), changing food (unstable nourishment/ideas), fox king (trickster/guide figure), golden key (access to unconscious realms)",
      emotions: "Confusion, curiosity, creative inspiration, acceptance",
      interpretation: "This dream suggests you're integrating different aspects of your personality or experiences. The animals represent different character traits or people in your life, while your human presence among them highlights feelings of difference or uniqueness. The changing food represents shifting ideas or emotional nourishment. Your storytelling transforming the animals reveals how self-expression can integrate disparate parts of yourself. The fox's revelation about the dream nexus suggests you're becoming aware of connections between different areas of your life or thought patterns. The golden key represents your developing ability to move consciously between different states of mind or perspectives."
    },
    similarDreams: ["2", "4"]
  },
]

export default function DreamPage({ params }: { params: { id: string } }) {
  const dream = mockDreams.find((d) => d.id === params.id)
  
  if (!dream) {
    notFound()
  }
  
  const similarDreams = dream.similarDreams
    .map((id) => mockDreams.find((d) => d.id === id))
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-purple-950/30 to-black text-white bg-stars">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center mb-6">
            <Link href="/history">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-cyan-300 hover:text-cyan-200 hover:bg-blue-950/40"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{dream.title}</h1>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center text-sm text-slate-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDistanceToNow(dream.createdAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center text-sm text-slate-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>Dream Duration: ~2 hours</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {dream.tags.map((tag) => (
              <span key={tag} className="text-xs bg-purple-900/40 text-cyan-300 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <section className="mb-8">
          <div className="relative h-64 sm:h-80 md:h-96 w-full mb-6 rounded-xl overflow-hidden">
            <Image
              src={dream.imageUrl}
              alt="Dream visualization"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="bg-blue-950/10 border border-purple-900/20 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-3">Dream Narrative</h2>
            <p className="text-cyan-100 whitespace-pre-line">{dream.text}</p>
          </div>
          
          <div className="bg-blue-950/10 border border-purple-900/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-3">Dream Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-2">Themes</h3>
                <p className="text-cyan-100 mb-4">{dream.analysis.themes}</p>
                
                <h3 className="text-lg font-medium text-purple-300 mb-2">Symbols</h3>
                <p className="text-cyan-100">{dream.analysis.symbols}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-2">Emotions</h3>
                <p className="text-cyan-100 mb-4">{dream.analysis.emotions}</p>
                
                <h3 className="text-lg font-medium text-purple-300 mb-2">Interpretation</h3>
                <p className="text-cyan-100">{dream.analysis.interpretation}</p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">Similar Dreams</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {similarDreams.map((similar) => (
              <Link href={`/dreams/${similar?.id}`} key={similar?.id}>
                <div className="bg-blue-950/10 border border-purple-900/20 rounded-xl overflow-hidden hover:bg-blue-950/20 transition-colors">
                  <div className="relative h-40 w-full">
                    <Image
                      src={similar?.imageUrl || ""}
                      alt="Dream visualization"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-cyan-300 mb-1">{similar?.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">
                      {formatDistanceToNow(similar?.createdAt || new Date(), { addSuffix: true })}
                    </p>
                    <p className="text-cyan-100 text-sm line-clamp-2">{similar?.text}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

