import { useCallback, useMemo, useState } from "react";

import {
  calculateBalance,
  createEntryId,
  DEFAULT_SETTINGS,
  type AppState,
  type Entry,
} from "./balance";

export function useBalance() {
  const [state, setState] = useState<AppState>({
    entries: [],
    settings: DEFAULT_SETTINGS,
  });

  const balanceCents = useMemo(
    () => calculateBalance(state.entries),
    [state.entries],
  );

  const add = useCallback((amountCents: number) => {
    const entry: Entry = {
      id: createEntryId(),
      type: "add",
      amountCents,
      createdAt: new Date().toISOString(),
    };

    setState((current) => ({
      ...current,
      entries: [entry, ...current.entries],
    }));
  }, []);

  const remove = useCallback((amountCents: number) => {
    const entry: Entry = {
      id: createEntryId(),
      type: "remove",
      amountCents,
      createdAt: new Date().toISOString(),
    };

    setState((current) => ({
      ...current,
      entries: [entry, ...current.entries],
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      entries: [],
      settings: DEFAULT_SETTINGS,
    });
  }, []);

  return {
    balanceCents,
    entries: state.entries,
    settings: state.settings,
    add,
    remove,
    reset,
  };
}
