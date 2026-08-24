---
name: vehicle-data-and-vin
description: Implement and review VIN and vehicle-data workflows used alongside VehicleFeeCalc calculations without conflating vehicle identification with fee rules.
---

# Vehicle Data and VIN

## Purpose
Use this skill when working on VIN lookup, vehicle metadata, year/make/model inputs, or integrations that feed calculator inputs.

## Boundaries
Vehicle identification data and fee rules are separate concerns:
- VIN decoding can identify vehicle attributes.
- State/jurisdiction rules determine fees.
- Do not infer a fee solely from a VIN result.

## VIN workflow
1. Validate VIN format where appropriate.
2. Use the project's approved VIN/vehicle-data source.
3. Treat external data as untrusted input.
4. Normalize returned fields before using them in the UI.
5. Allow users to correct missing or incorrect vehicle data.
6. Never expose private credentials or API keys.

## Calculator integration
Only map vehicle attributes that are actually required by the fee rule, such as vehicle type, model year, weight, fuel type, or taxable value when supported.

Do not invent a vehicle attribute if the source does not provide it.

## Error handling
Provide a graceful manual-entry path when VIN lookup fails, times out, or returns incomplete data.
