import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Global navigation */}
      <Navbar />

      {/* Main content area */}
      <main id="main-content" className="flex-1">
        {children}
        <footer className="prose prose-invert mx-auto p-3 text-center border-t border-dashed">
          This website was built by{" "}
          <Link href="https://ingo.au" target="_blank">
            Ingo Wolf
          </Link>{" "}
          with Next.js and Convex. It's also{" "}
          <Link href="https://github.com/Inglan/ama-webapp" target="_blank">
            open source
          </Link>
          .
        </footer>
      </main>
    </>
  );
}
