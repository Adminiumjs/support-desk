/*
 * Skeleton shell. This is a placeholder so the scaffold builds and runs; the
 * screen port replaces it with the real app — a state-based `view` switch
 * (no router) over the 39 screens, the Zustand store, and the DataSource seam
 * at src/data/source.ts.
 */
export function App() {
  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        minBlockSize: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
          Support Desk
        </h1>
        <p style={{ color: "var(--fg-muted)" }}>
          Scaffold ready — screens not ported yet.
        </p>
      </div>
    </main>
  );
}
