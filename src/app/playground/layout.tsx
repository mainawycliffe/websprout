import Header from "@/components/layout/Header";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
