import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("scaffold", () => {
  it("renders the placeholder home page", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Andrés Largo" }),
    ).toBeInTheDocument();
  });
});
