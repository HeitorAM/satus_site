import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const getSiteUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://satusgestao.com.br"
  // Add https:// if protocol is missing
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`
}

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Satus Gestão | Gestão Contábil e Consultoria Empresarial",
    template: "%s | Satus Gestão",
  },
  description:
    "Especialistas em gestão contábil, consultoria empresarial e soluções digitais para o seu negócio. Transforme sua gestão com tecnologia e expertise em Joinville, SC.",
  keywords: [
    "gestão contábil",
    "consultoria empresarial",
    "contabilidade",
    "gestão de documentos",
    "app contábil",
    "contador Joinville",
    "contabilidade Joinville",
    "consultoria fiscal",
    "planejamento tributário",
  ].join(", "),
  authors: [{ name: "Satus Gestão Contábil LTDA" }],
  creator: "Satus Gestão Contábil",
  publisher: "Satus Gestão Contábil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Satus Gestão Contábil",
    title: "Satus Gestão | Gestão Contábil e Consultoria Empresarial",
    description:
      "Especialistas em gestão contábil, consultoria empresarial e soluções digitais para o seu negócio. Transforme sua gestão com tecnologia e expertise.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Satus Gestão Contábil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satus Gestão | Gestão Contábil e Consultoria Empresarial",
    description: "Especialistas em gestão contábil, consultoria empresarial e soluções digitais para o seu negócio.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={`font-sans ${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
