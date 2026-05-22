export default function ToolsLoading() {
  return (
    <div className="min-h-screen animate-pulse" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="py-10" style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-32 rounded-lg mb-3" style={{ backgroundColor: "var(--bg-card)" }} />
          <div className="h-4 w-64 rounded mb-6" style={{ backgroundColor: "var(--bg-card)" }} />
          <div className="h-10 w-80 rounded-xl" style={{ backgroundColor: "var(--bg-card)" }} />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl h-40" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
