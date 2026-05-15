import HandoffDemo from "@/components/HandoffDemo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-12 px-4 selection:bg-blue-500/30">
      <HandoffDemo />
    </main>
  );
}

export const metadata = {
  title: "Finchip Handoff Protocol",
  description: "Secure deployment and collaboration workflow demonstration for Finchip.",
};
