# Exercise: Remove Fee

## Task

Extend a small React app that tracks a balance. When the user removes money, support a configurable fee.

The starter code is intentionally incomplete. Focus on React state, forms, conditional UI, and tests.

---

## Requirements

### Fee behavior

- The user can set a fee percentage applied to **Remove** actions.
- Maximum fee is **5%**.
- The fee is deducted from the requested remove amount.
- The user receives the remaining amount.
- The balance decreases by the full remove amount.

Example — remove **$100.00** with a **1%** fee:

|                  | Amount  |
| ---------------- | ------- |
| User receives    | $99.00  |
| Fee              | $1.00   |
| Balance decrease | $100.00 |

### UI

- Add controls in **Fee settings** to configure the fee.
- Show a fee breakdown on the remove form when a fee applies.
- Update **History** so remove entries show gross amount, fee, and net received when relevant.

### Validation

Reject:

- fee above 5%
- remove amounts that exceed the available balance

Show clear validation feedback in the UI.

### Testing

Update the test suite to cover:

- remove with a fee
- zero fee
- maximum fee
- invalid fee
- insufficient balance
- UI feedback for validation failures

### Design notes

Complete `DESIGN.md` with assumptions, key decisions, accessibility notes, and trade-offs. Keep it brief.

---

## Constraints

- Stay within the existing files where possible.
- React only — no APIs, persistence, or external integrations.
- Avoid unnecessary abstractions.

---

## Time expectation

About **60–90 minutes**.
