---
name: state-fee-research
description: Research and implement state-specific DMV fee rules using authoritative government sources and maintainable fee data.
---

# State Fee Research

## Purpose
Use this skill when adding a state, updating a state fee schedule, investigating a disputed fee, or determining how a DMV/BMV calculates a charge.

## Source hierarchy
Prefer:
1. Official state DMV/BMV/Department of Revenue/transportation agency pages.
2. Official state statutes, regulations, fee schedules, or government PDFs.
3. Other authoritative government publications when the agency calculator is unavailable.

Do not use SEO blogs, forums, or competitor calculators as the authoritative source for a fee value.

## Research workflow
1. Identify the exact state and charge.
2. Find the current official source.
3. Record the source URL, effective date if available, and verification date.
4. Determine the formula, fixed amount, percentage, minimum, maximum, or conditional rule.
5. Identify county/district/local variations.
6. Identify EV or alternative-fuel surcharges.
7. Identify exemptions and special cases.
8. Encode the rule in a state-specific module.
9. Add tests using examples from the source where possible.

## Data-model guidance
Represent fee rules as structured data or pure functions when practical. Keep:
- amount/rate
- taxable/fee base
- effective date
- jurisdiction
- eligibility conditions
- source URL
- verification date

separate from UI presentation.

## Important
If the official source is ambiguous, do not guess. Flag the ambiguity and preserve the source citation for human review.
