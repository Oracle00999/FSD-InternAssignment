import "./globals.css";

export const metadata = {
  title: "Notes App",
  description: "Create and view notes with AI summaries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
