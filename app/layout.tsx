import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SplashCursorWrapper from "@/components/splash-cursor-wrapper"
import StarsBackgroundWrapper from "@/components/stars-background-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fable Flow - Dream Visualizer",
  description: "Record, visualize, and analyze your dreams",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative min-h-screen">
            <SplashCursorWrapper 
              BACK_COLOR={{ r: 0, g: 0, b: 0 }}
              TRANSPARENT={true}
              DENSITY_DISSIPATION={2.5}
              VELOCITY_DISSIPATION={1.5}
              SPLAT_RADIUS={0.3}
              CURL={20}
              COLOR_UPDATE_SPEED={6}
            />
            <StarsBackgroundWrapper 
              starDensity={0.0002}
              allStarsTwinkle={true}
              twinkleProbability={0.8}
              minTwinkleSpeed={0.3}
              maxTwinkleSpeed={1.2}
            />
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}