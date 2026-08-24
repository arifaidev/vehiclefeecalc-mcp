---
name: out-the-door-calculator
description: Build and review VehicleFeeCalc out-the-door purchase calculations, including registration, title, sales tax, plates, and conditional charges.
---

# Out-the-Door Calculator

## Purpose
Use this skill when implementing or reviewing the purchase-price-to-total-cost calculator.

## Scope
The VehicleFeeCalc out-the-door calculator is intended to combine applicable:
- vehicle purchase price
- sales/use tax
- title charges
- registration
- plate charges
- other verified state/county charges supported by the product

Do not automatically include back-fee penalties unless the product explicitly defines them for the transaction.

## Calculation workflow
1. Determine the state and applicable jurisdiction.
2. Normalize purchase price and other monetary inputs.
3. Determine the correct taxable base.
4. Apply the verified state/county tax rule.
5. Calculate title, registration, plate, and other applicable charges separately.
6. Present each line item.
7. Sum the line items into the estimated out-the-door total.

## Trade-ins and incentives
Only subtract trade-in amounts, rebates, discounts, or incentives from the taxable base when the specific state's verified rule supports that treatment.

Never assume a nationwide tax treatment.

## Rounding
Follow the state's documented rounding rule and the application's established monetary precision. Avoid floating-point accumulation errors where the codebase supports decimal/integer-cent arithmetic.

## Review checklist
- Taxable base is correct.
- Trade-in treatment is state-specific.
- Title/registration/plate charges are not duplicated.
- Conditional EV or local charges are included only when applicable.
- Displayed total equals displayed line items.
- Estimate disclaimer is clear.
