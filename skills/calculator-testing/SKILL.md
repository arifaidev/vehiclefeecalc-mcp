---
name: calculator-testing
description: Test VehicleFeeCalc calculation engines, edge cases, rounding, conditional fees, and regression behavior.
---

# Calculator Testing

## Purpose
Use this skill when creating or reviewing automated tests for VehicleFeeCalc calculators.

## Test layers
Prefer tests at three levels:
1. Pure fee/rate functions.
2. State calculator composition.
3. User-facing calculator totals and itemized output.

## Required scenarios
For each state calculator, cover where applicable:
- ordinary passenger vehicle
- low/high purchase price boundaries
- zero or missing optional values
- county/district rate changes
- EV eligibility and EV surcharge
- title-only transaction
- registration-only transaction
- back fees/penalties
- plate charges
- rounding boundaries
- taxable-base boundaries
- exemptions or special cases supported by the source

## Invariants
A robust calculator should satisfy:
- total = sum of displayed applicable line items
- changing an unrelated input does not change unrelated fees
- a non-eligible conditional fee is exactly zero/absent
- rates are not applied twice
- state rules do not leak across states

## Regression workflow
When a fee changes:
1. Update the authoritative data/rule.
2. Update affected expected values.
3. Add a regression case explaining the change.
4. Run the full calculator test suite.
5. Check representative UI totals.

Do not weaken tests merely to make a changed calculation pass.
