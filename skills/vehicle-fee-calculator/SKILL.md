---
name: vehicle-fee-calculator
description: Build and maintain vehicle registration, title, tax, plate, penalty, EV-fee, and related calculator logic for VehicleFeeCalc.com.
---

# Vehicle Fee Calculator

## Purpose
Use this skill when implementing, reviewing, refactoring, or debugging VehicleFeeCalc calculator logic for VehicleFeeCalc.com.

## Core principles
- Keep calculations itemized. A user should be able to see what contributes to the total.
- Keep state-specific rules isolated. Never assume one state's fee model applies to another.
- Treat county/district rates, EV surcharges, penalties, and other conditional charges as explicit inputs or rules.
- Preserve the distinction between registration, title transfer, back fees, and out-the-door calculations.
- Prefer verified source data over hard-coded assumptions.
- Clearly distinguish an estimate from an official DMV amount.

## Calculator boundaries
VehicleFeeCalc currently distinguishes:
- Registration fee calculators: registration and applicable plates.
- Title transfer calculators: title-related charges and applicable sales tax.
- Back-fee calculators: registration-related back fees and penalties.
- Out-the-door calculators: registration, title, sales tax, and plates.

Do not silently add a charge to a calculator if it belongs to a different calculator's scope.

## Implementation workflow
1. Identify the state and calculator type.
2. Locate the state-specific fee/rate source or data module.
3. Identify all required inputs and conditional branches.
4. Calculate each charge independently.
5. Produce a transparent itemized breakdown.
6. Sum only the applicable line items.
7. Add tests for normal, boundary, and conditional cases.
8. Preserve source/verification metadata where the application supports it.

## Safety against bad fee data
Never invent a fee amount because a value is missing. Mark it as needing verification and use the project's established fallback behavior.

## Review checklist
- Is the state correct?
- Is the county/district rate correct?
- Are EV rules applied only when eligible?
- Are taxes calculated from the correct taxable base?
- Are penalties separated from ordinary registration charges?
- Is rounding performed at the same stage as the source rule?
- Is the final total exactly the sum of displayed line items?
