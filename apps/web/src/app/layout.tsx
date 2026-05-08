import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@xyflow/react/dist/style.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'PortalCanvas',
  description: 'Visualize Portaldot contracts as a connected whiteboard with storage, events, permissions, and POT fee inspection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
