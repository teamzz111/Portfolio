import { beforeEach, describe, expect, it, vi } from "vitest";
import { MOTION_MULT, motionState, resetMotion, tickMotion } from "./motion-state";

beforeEach(() => {
  resetMotion();
});

describe("motion-state", () => {
  it("lerps mouse toward target at 0.05 per tick", () => {
    motionState.mouse.tx = 1;
    motionState.mouse.ty = -1;
    tickMotion(0);
    expect(motionState.mouse.x).toBeCloseTo(0.05);
    expect(motionState.mouse.y).toBeCloseTo(-0.05);
    tickMotion(16);
    expect(motionState.mouse.x).toBeCloseTo(0.05 + (1 - 0.05) * 0.05);
  });

  it("lerps smoothProgress toward progress at 0.06 per tick", () => {
    motionState.progress = 1;
    tickMotion(0);
    expect(motionState.smoothProgress).toBeCloseTo(0.06);
  });

  it("invokes registered frame callbacks with the frame time", () => {
    const cb = vi.fn();
    motionState.onFrame.add(cb);
    tickMotion(123);
    expect(cb).toHaveBeenCalledWith(123);
  });

  it("does not invoke advance from tickMotion (the provider loop owns it)", () => {
    const advance = vi.fn();
    motionState.advance = advance;
    tickMotion(0);
    expect(advance).not.toHaveBeenCalled();
  });

  it("exposes the prototype motion multiplier 4/7", () => {
    expect(MOTION_MULT).toBeCloseTo(4 / 7);
  });

  it("resetMotion restores a clean state", () => {
    motionState.progress = 0.7;
    motionState.mouse.tx = 1;
    motionState.onFrame.add(() => {});
    resetMotion();
    expect(motionState.progress).toBe(0);
    expect(motionState.mouse.tx).toBe(0);
    expect(motionState.onFrame.size).toBe(0);
  });
});
