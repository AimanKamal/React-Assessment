import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  calculateBalance,
  formatCurrency,
  parseAmountInput,
  type Entry,
} from "@/balance";
import { useBalance } from "@/useBalance";

describe("balance helpers", () => {
  it("calculates balance from add and remove entries", () => {
    const entries: Entry[] = [
      {
        id: "1",
        type: "add",
        amountCents: 100_000,
        createdAt: "2026-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        type: "remove",
        amountCents: 25_000,
        createdAt: "2026-01-02T00:00:00.000Z",
      },
    ];

    expect(calculateBalance(entries)).toBe(75_000);
  });

  it("formats currency values", () => {
    expect(formatCurrency(10_000)).toBe("$100.00");
  });

  it("parses valid amount input", () => {
    expect(parseAmountInput("10")).toBe(1_000);
    expect(parseAmountInput("9.99")).toBe(999);
  });

  it("rejects invalid amount input", () => {
    expect(parseAmountInput("")).toBeNull();
    expect(parseAmountInput("0")).toBeNull();
    expect(parseAmountInput("-5")).toBeNull();
    expect(parseAmountInput("abc")).toBeNull();
  });
});

describe("useBalance", () => {
  it("tracks add and remove entries", () => {
    const { result } = renderHook(() => useBalance());

    act(() => {
      result.current.add(10_000);
      result.current.remove(2_500);
    });

    expect(result.current.balanceCents).toBe(7_500);
    expect(result.current.entries).toHaveLength(2);
  });

  it("resets state", () => {
    const { result } = renderHook(() => useBalance());

    act(() => {
      result.current.add(5_000);
      result.current.reset();
    });

    expect(result.current.balanceCents).toBe(0);
    expect(result.current.entries).toHaveLength(0);
  });
});
