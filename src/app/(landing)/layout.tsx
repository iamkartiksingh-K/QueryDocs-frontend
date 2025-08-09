import Navbar from "@/components/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen bg-white">
      <Navbar />
      {children}
    </main>
  );
}
