import type { Metadata, Viewport } from "next"
import "@fontsource/lilita-one/latin-400.css"
import "@fontsource-variable/nunito/wght.css"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"


export const metadata: Metadata = {
  title: "Ly Mean Sreang — iOS & Full-Stack Developer",
  description:
    "Portfolio of Ly Mean Sreang, an iOS and full-stack developer in Phnom Penh. Play Bug Defense, then explore projects and experience.",
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  openGraph: {
    title: "Ly Mean Sreang — iOS & Full-Stack Developer",
    description: "Play Bug Defense, then explore my projects and experience.",
    type: "website",
  },
}

export const viewport: Viewport = { themeColor: "#9fd8f5" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_STATIC_PREVIEW ? null : <Analytics />}
      </body>
    </html>
  )
}
