import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import SystemGraphLoader from "./SystemGraphLoader";

describe("SystemGraphLoader", () => {
  it("renders nothing when WebGL is unavailable (poster fallback)", () => {
    // jsdom has no WebGL context, so the gate must keep the tree empty.
    const { container } = render(<SystemGraphLoader />);
    expect(container).toBeEmptyDOMElement();
  });
});
