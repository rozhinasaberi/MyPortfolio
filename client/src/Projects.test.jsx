import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

import Projects from "./Projects"; 
describe("Projects Component", () => {
  it("renders the Projects section title", () => {
    render(<Projects />);

    const title = screen.getByText(/projects/i);
    expect(title).toBeInTheDocument();
  });
});
