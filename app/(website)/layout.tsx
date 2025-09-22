"use client";
import type React from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/Footer"; 
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Navbar from "@/components/Navbar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      {pathname === "/" && <FloatingWhatsApp />}

      <Footer />
    </>
  );
}