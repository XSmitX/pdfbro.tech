import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <PageBackground variant="minimal" />

      <div className="relative">
        {/* Glowing 404 */}
        <div className="mb-8 relative">
          <span
            className="text-8xl font-black gradient-text select-none"
            style={{ filter: "drop-shadow(0 0 40px rgba(79,142,247,0.3))" }}
          >
            404
          </span>
        </div>

        {/* Icon */}
        <div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
        >
          <Search className="h-9 w-9" style={{ color: "var(--text-muted)" }} />
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          Page Not Found
        </h1>
        <p className="text-lg mb-8 max-w-md" style={{ color: "var(--text-secondary)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/tools"
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
