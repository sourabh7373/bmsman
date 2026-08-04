import "./globals.css";

export const metadata = {
  title: "BMSMan",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
