"use client";
import ShortenUrlForm from "@/components/ui/ShortenUrlForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShortenUrlForm />
    </main>
  );
}
