import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"

// This would normally be fetched from an API
const mockDreams = [
  {
    id: "1",
    text: "I was flying over a city made of crystal, with rainbow bridges connecting floating islands. The sky was purple and filled with stars even though it was daytime.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    imageUrl: "/images/1.jpeg",
  },
  {
    id: "2",
    text: "I was in an ancient library where the books could talk. They were telling me secrets about the universe, but I could only remember fragments when I woke up.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    imageUrl: "/images/2.jpeg",
  },
]

export default function RecentDreams() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockDreams.map((dream) => (
        <Link href={`/dreams/${dream.id}`} key={dream.id}>
          <Card className="bg-slate-800/30 border-indigo-900/30 hover:bg-slate-800/50 transition-colors overflow-hidden h-full">
            <CardContent className="p-0">
              <div className="p-4">
                <p className="text-sm text-slate-400 mb-1">
                  {formatDistanceToNow(dream.createdAt, { addSuffix: true })}
                </p>
                <p className="text-indigo-100 line-clamp-2 mb-3">{dream.text}</p>
              </div>
              <div className="relative h-40 w-full">
                <Image
                  src={dream.imageUrl}
                  alt="Dream visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

