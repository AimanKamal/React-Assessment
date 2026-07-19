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

  it("removes money with a fee", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Add $100
    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Add" }));

    // Set 1% fee
    await user.clear(screen.getByLabelText("Remove fee (%)"));
    await user.type(screen.getByLabelText("Remove fee (%)"), "1");

    // Remove $100
    await user.clear(screen.getByLabelText("Amount (USD)"));
    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.getByLabelText("Current balance")).toHaveTextContent("$0.00");
  });

  it("removes money with zero fee", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await user.clear(screen.getByLabelText("Amount (USD)"));
    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.getByLabelText("Current balance")).toHaveTextContent("$0.00");
  });

  it("shows fee breakdown in history after removing money", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await user.clear(screen.getByLabelText("Remove fee (%)"));
    await user.type(screen.getByLabelText("Remove fee (%)"), "1");

    await user.clear(screen.getByLabelText("Amount (USD)"));
    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.getByText("Gross: $100.00")).toBeInTheDocument();

    expect(screen.getByText("Fee: $1.00")).toBeInTheDocument();

    expect(screen.getByText("Received: $99.00")).toBeInTheDocument();
  });

  it("allows maximum fee of 5%", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.clear(screen.getByLabelText("Remove fee (%)"));
    await user.type(screen.getByLabelText("Remove fee (%)"), "5");

    expect(screen.getByText("Current fee:")).toHaveTextContent("5%");
  });

  it("rejects fee above 5%", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.clear(screen.getByLabelText("Remove fee (%)"));
    await user.type(screen.getByLabelText("Remove fee (%)"), "6");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Fee must be between 0% and 5%",
    );

    expect(screen.getByText("Current fee:")).toHaveTextContent("0%");
  });

  it("shows fee breakdown in history after removing money", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Add $100
    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Add" }));

    // Set 1% fee
    await user.clear(screen.getByLabelText("Remove fee (%)"));
    await user.type(screen.getByLabelText("Remove fee (%)"), "1");

    // Remove $100
    await user.clear(screen.getByLabelText("Amount (USD)"));
    await user.type(screen.getByLabelText("Amount (USD)"), "100");
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.getByText("Gross: $100.00")).toBeInTheDocument();
    expect(screen.getByText("Fee: $1.00")).toBeInTheDocument();
    expect(screen.getByText("Received: $99.00")).toBeInTheDocument();
  });
});
