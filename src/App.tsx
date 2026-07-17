import { useState, type FormEvent } from "react";

import {
  formatCurrency,
  parseAmountInput,
  type Entry,
} from "./balance";
import { useBalance } from "./useBalance";

export function App() {
  const { balanceCents, entries, settings, add, remove } = useBalance();

  return (
    <div className="app">
      <header>
        <p className="eyebrow">React exercise</p>
        <h1>Balance</h1>
        <p className="intro">
          Add a configurable fee when removing money. See <code>ISSUE.md</code>.
        </p>
      </header>

      <main className="layout">
        <section aria-label="Current balance" className="panel">
          <h2>Balance</h2>
          <p className="balance">{formatCurrency(balanceCents)}</p>
        </section>

        <AmountForm balanceCents={balanceCents} onAdd={add} onRemove={remove} />

        <FeeSettings settings={settings} />

        <section aria-label="Entry history" className="panel">
          <h2>History</h2>
          <EntryList entries={entries} />
        </section>
      </main>
    </div>
  );
}

interface AmountFormProps {
  balanceCents: number;
  onAdd: (amountCents: number) => void;
  onRemove: (amountCents: number) => void;
}

function AmountForm({ balanceCents, onAdd, onRemove }: AmountFormProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const action = formData.get("action");

    if (action !== "add" && action !== "remove") {
      setError("Choose add or remove.");
      return;
    }

    const amountCents = parseAmountInput(amount);

    if (amountCents === null) {
      setError("Enter a valid amount greater than zero.");
      return;
    }

    if (action === "remove" && amountCents > balanceCents) {
      setError("Not enough balance for this amount.");
      return;
    }

    if (action === "add") {
      onAdd(amountCents);
    } else {
      onRemove(amountCents);
    }

    setAmount("");
  }

  return (
    <section aria-label="Update balance" className="panel">
      <h2>Update balance</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount (USD)</label>
        <input
          id="amount"
          name="amount"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        {error ? (
          <p role="alert" className="error">
            {error}
          </p>
        ) : null}

        <div className="actions">
          <button type="submit" name="action" value="add">
            Add
          </button>
          <button type="submit" name="action" value="remove">
            Remove
          </button>
        </div>
      </form>
    </section>
  );
}

interface FeeSettingsProps {
  settings: ReturnType<typeof useBalance>["settings"];
}

function FeeSettings({ settings }: FeeSettingsProps) {
  return (
    <section aria-label="Fee settings" className="panel">
      <h2>Fee settings</h2>
      <p className="hint">
        Wire up fee configuration here. Requirements are in{" "}
        <code>ISSUE.md</code>.
      </p>
      <p>
        Current fee: <strong>{settings.removeFeePercent}%</strong>
      </p>
    </section>
  );
}

function EntryList({ entries }: { entries: Entry[] }) {
  if (entries.length === 0) {
    return <p className="hint">No entries yet.</p>;
  }

  return (
    <ul className="history">
      {entries.map((entry) => (
        <li key={entry.id}>
          <span>{entry.type === "add" ? "Add" : "Remove"}</span>
          <span>
            {entry.type === "add" ? "+" : "-"}
            {formatCurrency(entry.amountCents)}
          </span>
        </li>
      ))}
    </ul>
  );
}
