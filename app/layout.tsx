import type { Metadata } from "next"
import { Noto_Sans_SC, Noto_Serif_SC, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
})

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700", "900"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MBA 经典分析框架 · 交互式课件",
  description: "25 个 MBA & 咨询经典分析框架的交互式学习平台",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={cn(notoSans.variable, notoSerif.variable, geistMono.variable, "h-full antialiased")}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  )
}
