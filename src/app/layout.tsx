import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/dom/SmoothScroll';
import NoiseOverlay from '@/components/dom/NoiseOverlay';
import CustomCursor from '@/components/dom/CustomCursor';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ericdominici.com'),
  title: 'Eric Dominici | Arquitecto de Realidades',
  description: 'Scrum Master, Agile Coach & Product Engineer. Transformando caos técnico en flujos predecibles y de alto rendimiento.',
  keywords: ["Product Manager", "Software Engineer", "Scrum Master", "Agile Coach", "Next.js", "WebGL", "React", "Three.js", "Portfolio"],
  authors: [{ name: "Eric Dominici" }],
  creator: "Eric Dominici",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Eric Dominici | Arquitecto de Realidades",
    description: "Transformando caos técnico en flujos predecibles y de alto rendimiento.",
    siteName: "Eric Dominici Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Imagen 1200x630 que debes subir en /public
        width: 1200,
        height: 630,
        alt: "Eric Dominici - Arquitecto de Realidades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Dominici | Arquitecto de Realidades",
    description: "Transformando caos técnico en flujos predecibles y de alto rendimiento.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased bg-black text-white`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-brand-orange/30">
        <NoiseOverlay />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
