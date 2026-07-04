import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sfPro = localFont({
  variable: '--font-sf-pro',
  display: 'swap',
  preload: true,
  src: [
    { path: '../assets/fonts/SF-Pro-Text-Light.otf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/SF-Pro-Text-Regular.otf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/SF-Pro-Text-RegularItalic.otf', weight: '400', style: 'italic' },
    { path: '../assets/fonts/SF-Pro-Text-Medium.otf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/SF-Pro-Display-Light.otf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/SF-Pro-Display-Regular.otf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/SF-Pro-Display-Medium.otf', weight: '500', style: 'normal' },
  ],
})

export const metadata: Metadata = {
  title: 'SOHABI - Friends, coffee, nearby moments',
  description: 'SOHABI helps you turn nearby matches into safe friendships, coffee plans, and real social moments.',
  generator: 'SOHABI',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sfPro.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
