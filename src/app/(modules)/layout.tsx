import Header from "@/components/layout/Header";

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full">
      <Header backHref="/" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
