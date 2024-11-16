import Navbar from "../../components/Navbar";

export const username = "José Pérez";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar role="doctor" />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
