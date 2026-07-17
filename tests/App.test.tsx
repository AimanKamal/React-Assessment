import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { App } from "@/App";

describe("App", () => {
  it("renders the starting balance", () => {
    render(<App />);

    expect(screen.getByLabelText("Current balance")).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("records an add entry", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("Amount (USD)"), "25");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("$25.00")).toBeInTheDocument();
    expect(screen.getAllByText("Add").length).toBeGreaterThan(0);
  });

  it("rejects remove amounts above the current balance", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("Amount (USD)"), "20");
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(
      screen.getByText("Not enough balance for this amount."),
    ).toBeInTheDocument();
  });
});
