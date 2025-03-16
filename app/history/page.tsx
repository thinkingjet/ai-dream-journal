import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Calendar, Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Input } from "@/components/ui/input"

// This would normally be fetched from an API
const mockDreams = [
  {
    id: "1",
    text: "I was flying over a city made of crystal, with rainbow bridges connecting floating islands. The sky was purple and filled with stars even though it was daytime. I could feel the wind in my hair and the sensation of weightlessness. As I flew closer to one of the islands, I noticed people with translucent wings like dragonflies.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    imageUrl: "/images/1.jpeg",
    tags: ["flying", "fantasy", "city", "magical"]
  },
  {
    id: "2",
    text: "I was in an ancient library where the books could talk. They were telling me secrets about the universe, but I could only remember fragments when I woke up. The library seemed infinite, with shelves stretching up beyond what I could see. Some books floated in the air, their pages turning by themselves. An old librarian with glowing eyes guided me through hidden sections.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    imageUrl: "/images/2.jpeg",
    tags: ["knowledge", "fantasy", "mystery", "books"]
  },
  {
    id: "3",
    text: "I was swimming in an ocean of stars. Each time I touched a star, it turned into a small creature that would follow me. By the end, I had an entire galaxy of little light beings swimming with me. They communicated through pulses of light and showed me constellations that told stories of ancient civilizations. I could breathe underwater and felt completely at peace.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    imageUrl: "/images/3.jpeg",
    tags: ["space", "swimming", "creatures", "cosmic"]
  },
  {
    id: "4",
    text: "I was in a forest where the trees were made of glass. When the wind blew, they made beautiful music. I could control the wind with my hands, creating different melodies. The forest floor was covered in luminescent moss that lit up with each step I took. Small glass birds flew between the branches, their wings creating tinkling sounds like wind chimes.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    imageUrl: "/images/4.jpeg",
    tags: ["nature", "music", "control", "glass"]
  },
  {
    id: "5",
    text: "I found myself in a city where time flowed backwards. People walked in reverse, conversations happened end to beginning, and I watched buildings being dismantled brick by brick until they disappeared. I tried to communicate with the residents, but they couldn't understand me since I was moving forward in time while they moved backward.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    imageUrl: "/images/5.jpeg",
    tags: ["time", "city", "confusion", "reverse"]
  },
  {
    id: "6",
    text: "I was attending a feast in a medieval castle, but all the guests were animals dressed in elaborate clothing. I was the only human present, yet no one seemed to notice. The food kept changing every time I looked away - from roast meats to live butterflies to glowing fruits I'd never seen before. A fox in royal attire kept asking me riddles I couldn't answer.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
    imageUrl: "/images/6.jpeg",
    tags: ["animals", "feast", "medieval", "transformation"]
  },
]

export default function HistoryPage() {
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
            <h1 className="text-2xl font-bold">Dream History</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <Input
                placeholder="Search your dreams..."
                className="pl-9 bg-blue-950/10 border-purple-900/20 text-cyan-100 placeholder:text-slate-500"
              />
            </div>
            <Button variant="outline" className="border-purple-900/50 text-cyan-300 hover:bg-blue-950/20">
              <Calendar className="h-4 w-4 mr-2" />
              Filter by Date
            </Button>
          </div>
        </header>

        <section>
          <div className="grid grid-cols-1 gap-4">
            {mockDreams.map((dream) => (
              <Link href={`/dreams/${dream.id}`} key={dream.id}>
                <div className="bg-blue-950/10 border border-purple-900/20 rounded-xl overflow-hidden hover:bg-blue-950/20 transition-colors">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={dream.imageUrl}
                        alt="Dream visualization"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <p className="text-sm text-slate-400 mb-2">
                        {formatDistanceToNow(dream.createdAt, { addSuffix: true })}
                      </p>
                      <p className="text-cyan-100 mb-2 line-clamp-3">{dream.text}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {dream.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-purple-900/40 text-cyan-300 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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

