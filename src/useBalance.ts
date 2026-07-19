import { useCallback, useMemo, useState } from "react";

import {
  calculateBalance,
  createEntryId,
  DEFAULT_SETTINGS,
  type AppState,
  type Entry,
  MAX_REMOVE_FEE_PERCENT,
  calculateFeeCents,
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

  const remove = useCallback(
    (amountCents: number) => {
      const feeCents = calculateFeeCents(
        amountCents,
        state.settings.removeFeePercent,
      );
      const entry: Entry = {
        id: createEntryId(),
        type: "remove",
        amountCents,
        feeCents,
        netAmountCents: amountCents - feeCents,
        createdAt: new Date().toISOString(),
      };

      setState((current) => ({
        ...current,
        entries: [entry, ...current.entries],
      }));
    },
    [state.settings],
  );

  const reset = useCallback(() => {
    setState({
      entries: [],
      settings: DEFAULT_SETTINGS,
    });
  }, []);

  const setRemoveFeePercent = useCallback(
    (removeFeePercent: number): boolean => {
      if (removeFeePercent < 0 || removeFeePercent > MAX_REMOVE_FEE_PERCENT) {
        return false;
      }
      setState((current) => ({
        ...current,
        settings: {
          ...current.settings,
          removeFeePercent,
        },
      }));
      return true;
    },
    [],
  );

  return {
    balanceCents,
    entries: state.entries,
    settings: state.settings,
    add,
    remove,
    reset,
    setRemoveFeePercent,
  };
}
