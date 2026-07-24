export default function Home() {
  return (
    <main className="al-gutter" style={{ paddingBlock: "10vh" }}>
      <h1
        className="font-display text-fg"
        style={{ fontWeight: 200, fontSize: "clamp(3.4rem,15vw,14rem)", lineHeight: 0.8 }}
      >
        Andrés
        <span style={{ fontWeight: 500, display: "block" }}>
          Largo<span className="text-accent">.</span>
        </span>
      </h1>
      <p className="font-serif italic text-accent" style={{ fontSize: "2rem" }}>
        beyond
      </p>
      <p className="font-mono text-muted" style={{ letterSpacing: "0.06em" }}>
        Sr. Software Engineer · FullStack · AI Workflows · Cloud &amp; Mobile
      </p>
    </main>
  );
}
