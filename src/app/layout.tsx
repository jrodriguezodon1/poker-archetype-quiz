import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Poker Personality Profile',
  description: '10 hands. 3 choices. What does your poker instinct reveal?',
  openGraph: {
    title: 'Poker Personality Profile',
    description: '10 hands. 3 choices. What does your poker instinct reveal?',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased relative">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
