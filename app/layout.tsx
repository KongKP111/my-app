import "./globals.css";

export const metadata = {
  title: "Game Store",
  description: "A simple game store application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50">{children}</body>
    </html>
  );
}
