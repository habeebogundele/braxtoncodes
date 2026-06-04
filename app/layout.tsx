import type {Metadata} from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Braxton Codes | Website Developer | AEO & GEO Expert',
  description: 'Helping businesses grow through custom high-converting website development, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) across Google, ChatGPT, Gemini, Perplexity, and Claude.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#050608] text-slate-100 font-sans antialiased selection:bg-cyan-400 selection:text-slate-950" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
