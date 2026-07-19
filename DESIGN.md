# Design Notes

## Assumptions

- Removing money represents a withdrawal action.
- The remove fee setting is controlled by an authorized user/admin.
- The configured fee percentage applies only to remove actions.
- The account balance decreases by the requested remove amount (gross amount), while the user receives the remaining amount after deducting the fee.

---

## Implementation

- Fee calculation is handled as part of the remove action flow.
- Each remove history entry stores:
  - Gross remove amount
  - Fee amount
  - Net amount received
- Balance calculation continues to use the gross remove amount to match the requirement.
- State is managed locally using React state through the `useBalance` hook.

---

## Accessibility

- Added `role="alert"` for validation messages so errors can be announced by assistive technologies.

---

## Trade-offs

What would you do differently with more time?

- Add authentication and role-based permissions for controlling fee configuration.
- Improve user feedback with toast notifications or inline success messages.
- Add more comprehensive error handling and edge case validation.
- Add persistence through a backend service if this were expanded into a production application.

~
