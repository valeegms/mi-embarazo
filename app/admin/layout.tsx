"use client";

import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.role !== "admin") {
    router.push("/unauthorized");
    return null;
  }

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar role="admin" />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
