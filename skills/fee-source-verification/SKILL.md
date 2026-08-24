---
name: fee-source-verification
description: Audit fee data, source URLs, effective dates, verification dates, and stale values used by VehicleFeeCalc.
---

# Fee Source Verification

## Purpose
Use this skill when auditing or updating the provenance of vehicle fee data.

## Verification standard
Every material fee/rate should have an authoritative source whenever the application's data model supports source metadata.

Record:
- state/jurisdiction
- fee name
- value or formula
- effective date
- verification date
- source URL
- notes about conditions/exemptions

## Audit workflow
1. Enumerate fee/rate inputs used by the calculator.
2. Trace each value to its source.
3. Check whether the source is still current.
4. Compare effective dates.
5. Check for county/district variations.
6. Check EV/alternative-fuel changes.
7. Flag missing, stale, or ambiguous values.
8. Update data and tests together.

## Staleness
Do not label a value "current" merely because a page still loads. Look for effective dates, revised fee schedules, or agency notices.

## Conflicts
If two official sources conflict:
- prefer the more recent effective rule when clearly applicable;
- preserve both references in notes if useful;
- do not silently choose a value when applicability is unclear.

## Output
When auditing, produce a concise list of:
- verified values
- changed values
- stale values
- missing sources
- unresolved questions
