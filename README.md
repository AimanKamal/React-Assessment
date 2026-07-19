# Balance — React Exercise

A short React exercise: add a configurable fee when removing money from a balance.

Requirements are in [`ISSUE.md`](./ISSUE.md).

---

## Setup

```bash
npm i
npm test
```

All quality checks:

```bash
make check
```

There is no dev server. Verify UI behavior through the tests in `tests/`.

---

## Files

```
src/
  App.tsx         UI
  useBalance.ts   React state hook
  balance.ts      Types and helpers
tests/
  App.test.tsx    Component tests
  balance.test.ts Hook and helper tests
```

---

## Commands

| Command              | Description            |
| -------------------- | ---------------------- |
| `npm test`           | Run tests              |
| `npm run test:watch` | Watch mode             |
| `make check`         | Format, lint, and test |

---

## Submit

- Updated source and tests
- Completed `DESIGN.md` (rename from `DESIGN.md.template`)

Preserve Git history if possible.
