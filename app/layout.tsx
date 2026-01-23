import "./globals.css";

export const metadata = {
  title: "RiseUp App 🚀",
  description: "RiseUp Ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
