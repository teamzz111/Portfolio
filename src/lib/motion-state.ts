// Shared mutable motion state. Written by ScrollTrigger/mousemove, read by
// rAF-driven consumers (R3F useFrame, parallax callbacks) — never by React
// render, so nothing re-renders per frame.

export type FrameCallback = (time: number) => void;

/** Prototype default: props.motion = 4, normalized by /7. */
export const MOTION_MULT = 4 / 7;

export const motionState = {
  /** Raw scroll progress 0→1 across the hero track (ScrollTrigger onUpdate). */
  progress: 0,
  /** Lerped progress consumed by the 3D camera. */
  smoothProgress: 0,
  /** Normalized mouse position; t* are targets, x/y are lerped. */
  mouse: { x: 0, y: 0, tx: 0, ty: 0 },
  /** R3F advance hook — set while the Canvas is mounted, called by the provider loop. */
  advance: null as ((time: number) => void) | null,
  /** Per-frame callbacks (name parallax, etc.), run by tickMotion. */
  onFrame: new Set<FrameCallback>(),
};

export function tickMotion(time: number) {
  const m = motionState;
  m.mouse.x += (m.mouse.tx - m.mouse.x) * 0.05;
  m.mouse.y += (m.mouse.ty - m.mouse.y) * 0.05;
  m.smoothProgress += (m.progress - m.smoothProgress) * 0.06;
  for (const cb of m.onFrame) cb(time);
}

export function resetMotion() {
  motionState.progress = 0;
  motionState.smoothProgress = 0;
  motionState.mouse.x = 0;
  motionState.mouse.y = 0;
  motionState.mouse.tx = 0;
  motionState.mouse.ty = 0;
  motionState.advance = null;
  motionState.onFrame.clear();
}
