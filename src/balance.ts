export type EntryType = "add" | "remove";

export interface Entry {
  id: string;
  type: EntryType;
  amountCents: number;
  feeCents?: number;
  netAmountCents?: number;
  createdAt: string;
}

export interface AppSettings {
  removeFeePercent: number;
}

export interface AppState {
  entries: Entry[];
  settings: AppSettings;
}

export const DEFAULT_SETTINGS: AppSettings = {
  removeFeePercent: 0,
};

export const MAX_REMOVE_FEE_PERCENT = 5;

export function calculateBalance(entries: Entry[]): number {
  return entries.reduce((balance, entry) => {
    if (entry.type === "add") {
      return balance + entry.amountCents;
    }

    return balance - entry.amountCents;
  }, 0);
}

export function formatCurrency(amountCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountCents / 100);
}

export function parseAmountInput(value: string): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const parsed = Number.parseFloat(trimmed);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return Math.round(parsed * 100);
}

export function createEntryId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function calculateFeeCents(
  amountCents: number,
  removeFeePercent: number,
): number {
  return Math.round(amountCents * (removeFeePercent / 100));
}
