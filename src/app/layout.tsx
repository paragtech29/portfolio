import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Parag Baldaniya | Frontend Developer & Team Lead",
  description:
    "Accomplished React.js Developer with over 4 years of experience in engineering scalable web applications and leading development teams. Proven track record in AI feature integration and mentoring engineers.",
  keywords: [
    "React.js",
    "Frontend Developer",
    "Team Lead",
    "Next.js",
    "TypeScript",
    "AI Integration",
    "Parag Baldaniya",
    "Portfolio",
  ],
  authors: [{ name: "Parag Baldaniya" }],
  creator: "Parag Baldaniya",
  openGraph: {
    type: "website",
    title: "Parag Baldaniya | Frontend Developer & Team Lead",
    description:
      "Accomplished React.js Developer with 4+ years of experience. Specializing in scalable web applications, AI integration, and team leadership.",
    siteName: "Parag Baldaniya Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parag Baldaniya | Frontend Developer & Team Lead",
    description:
      "Accomplished React.js Developer with 4+ years of experience. Specializing in scalable web applications, AI integration, and team leadership.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
