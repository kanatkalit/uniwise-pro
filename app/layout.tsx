import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "UniWise - Найдите свой идеальный университет",
  description: "Приложение для поиска подходящих университетов из топ-100 по вашим критериям",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress ResizeObserver loop errors
              window.addEventListener('error', function(e) {
                if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || 
                    e.message === 'ResizeObserver loop limit exceeded') {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}
