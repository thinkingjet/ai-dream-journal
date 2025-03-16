import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonStar, History, Sparkles } from "lucide-react"
import DreamRecorder from "@/components/dream-recorder"
import RecentDreams from "@/components/recent-dreams"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950/30 to-black text-white bg-stars">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <MoonStar className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Fable Flow
            </h1>
          </div>
          <nav className="flex gap-2">
            <Link href="/history">
              <Button variant="ghost" size="sm" className="text-cyan-300 hover:text-cyan-200 hover:bg-blue-950/40">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </Link>
            <Link href="/connections">
              <Button variant="ghost" size="sm" className="text-cyan-300 hover:text-cyan-200 hover:bg-blue-950/40">
                <Sparkles className="h-4 w-4 mr-2" />
                Connections
              </Button>
            </Link>
          </nav>
        </header>

        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Capture Your Dreams
            </h2>
            <p className="text-cyan-200/80 max-w-lg mx-auto">
              Capture your dreams through voice, and watch as they transform into stunning
              visuals. Let your subconscious mind paint pictures while you drift back to sleep.
            </p>
          </div>

          <div className="bg-blue-950/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-900/20">
            <DreamRecorder />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cyan-200">Recent Dreams</h2>
            <Link href="/history">
              <Button variant="outline" size="sm" className="border-purple-900/50 text-cyan-300 hover:bg-blue-950/20">
                View All
              </Button>
            </Link>
          </div>

          <Suspense fallback={<DreamsSkeleton />}>
            <RecentDreams />
          </Suspense>
        </section>
      </div>
    </main>
  )
}

function DreamsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="bg-blue-950/10 rounded-xl p-4 border border-purple-900/20">
          <Skeleton className="h-4 w-3/4 mb-2 bg-blue-900/20" />
          <Skeleton className="h-3 w-full mb-1 bg-blue-900/20" />
          <Skeleton className="h-3 w-5/6 mb-4 bg-blue-900/20" />
          <Skeleton className="h-32 w-full rounded-lg bg-blue-900/20" />
        </div>
      ))}
    </div>
  )
}

