import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Link from "next/link";

// Font configuration for optimal loading and performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
});

// SEO and metadata configuration
export const metadata: Metadata = {
  title: {
    default: "Aranda Music and Arts Program",
    template: "%s | Aranda Music and Arts Program",
  },
  description:
    "An after-school music, drama, and art program providing affordable tuition for students at Aranda Primary School. Enriching children's lives through the arts.",
  keywords: [
    "music lessons",
    "art classes",
    "drama classes",
    "after school program",
    "Aranda Primary School",
    "children's music",
    "piano lessons",
    "guitar lessons",
    "violin lessons",
    "art tuition",
    "Canberra",
    "ACT",
  ],
  authors: [{ name: "Aranda Music and Arts Program" }],
  creator: "Aranda Music and Arts Program",
  publisher: "Aranda Music and Arts Program",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://arandamusicprogram.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aranda Music and Arts Program",
    description:
      "An after-school music, drama, and art program providing affordable tuition for students at Aranda Primary School.",
    url: "https://arandamusicprogram.org",
    siteName: "Aranda Music and Arts Program",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aranda Music and Arts Program",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aranda Music and Arts Program",
    description:
      "An after-school music, drama, and art program providing affordable tuition for students at Aranda Primary School.",
    images: ["/og-image.jpg"],
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
  verification: {
    // Add Google Search Console verification if needed
    // google: "your-google-verification-code",
  },
};

/**
 * Root layout component for the Aranda Music and Arts Program website
 *
 * This layout provides:
 * - Authentication context via Convex
 * - Theme provider for light/dark mode
 * - Global navigation
 * - Font configuration
 * - Toast notifications
 *
 * @param children - Page content to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en-AU" suppressHydrationWarning>
        <head>
          {/* Preload critical resources */}
          <link rel="preload" href="/hero.mp4" as="video" type="video/mp4" />

          {/* Favicon and app icons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          {/* Viewport configuration for responsive design */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
        >
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* Skip to main content link for accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Skip to main content
              </a>

              {/* Global navigation */}
              <Navbar />

              {/* Main content area */}
              <main id="main-content" className="flex-1">
                {children}
                <footer className="prose prose-invert mx-auto p-3 text-center border-t border-dashed">
                  This website was built by{" "}
                  <Link href="https://ingo.au" target="_blank">
                    Ingo Wolf
                  </Link>{" "}
                  with Next.js and Convex. It's also{" "}
                  <Link
                    href="https://github.com/Inglan/ama-webapp"
                    target="_blank"
                  >
                    open source
                  </Link>
                  .
                </footer>
              </main>

              {/* Global toast notifications */}
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                    border: "1px solid hsl(var(--border))",
                  },
                }}
              />
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
