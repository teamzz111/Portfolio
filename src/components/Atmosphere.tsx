export default function Atmosphere({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <div aria-hidden>
      {/* z0 — gradient stage background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(120% 90% at 68% 8%, rgba(66,230,221,.10) 0%, rgba(66,230,221,0) 42%),
            radial-gradient(90% 120% at 18% 108%, rgba(30,58,64,.42) 0%, rgba(6,5,7,0) 55%),
            linear-gradient(180deg,#07080a 0%, #060507 60%, #050406 100%)`,
        }}
      />
      {/* z2 — WebGL canvas slot */}
      <div className="pointer-events-none fixed inset-0 z-[2]">{children}</div>
      {/* z5 — vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(115% 95% at 50% 42%, rgba(0,0,0,0) 46%, rgba(0,0,0,.55) 100%)",
          boxShadow: "inset 0 0 220px 40px rgba(0,0,0,.65)",
        }}
      />
      {/* z6 — animated film grain */}
      <div className="al-grain" />
    </div>
  );
}
