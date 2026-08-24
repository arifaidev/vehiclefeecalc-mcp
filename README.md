# VehicleFeeCalc Cursor Plugin

VehicleFeeCalc is a Cursor/Agent Plugin that gives coding agents specialized guidance for building and maintaining vehicle fee calculators and related content for [VehicleFeeCalc.com](https://vehiclefeecalc.com/).

## What it includes

- **vehicle-fee-calculator** — calculator architecture, itemized totals, state isolation, and fee composition.
- **state-fee-research** — research workflow for official state DMV/BMV fee rules.
- **calculator-testing** — regression, edge-case, rounding, and invariant testing.
- **vehiclefeecalc-seo** — state/calculator SEO and programmatic-page guidance.
- **fee-source-verification** — provenance, effective-date, and stale-data audits.
- **vehicle-data-and-vin** — VIN/vehicle-data integration boundaries and error handling.
- **out-the-door-calculator** — purchase price, tax, title, registration, plates, and conditional charges.

## Why this plugin exists

Vehicle fee calculations are jurisdiction-specific. The plugin is deliberately conservative: it tells the agent to verify fee values, keep state rules isolated, preserve itemized calculations, and avoid inventing missing fees.

The skills are domain guidance, not a replacement for official DMV/BMV sources.

## Install for local development

### Cursor local plugin

Clone this repository and place/symlink it under:

```text
~/.cursor/plugins/local/vehiclefeecalc
```

Restart Cursor or use **Developer: Reload Window**. Cursor supports both portable Agent Plugins with a root `plugin.json` and Cursor Plugins with `.cursor-plugin/plugin.json`.

### Project-local skills

The individual `skills/*/SKILL.md` files can also be copied into a project's `.cursor/skills/` directory when a full plugin installation is not desired.

## Repository structure

```text
vehiclefeecalc/
├── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── skills/
│   ├── vehicle-fee-calculator/SKILL.md
│   ├── state-fee-research/SKILL.md
│   ├── calculator-testing/SKILL.md
│   ├── vehiclefeecalc-seo/SKILL.md
│   ├── fee-source-verification/SKILL.md
│   ├── vehicle-data-and-vin/SKILL.md
│   └── out-the-door-calculator/SKILL.md
├── assets/
│   └── logo.svg
├── LICENSE
└── README.md
```

## Accuracy policy

Do not use this plugin to fabricate DMV fees. When a fee value is missing, changed, ambiguous, or unsupported, the agent should identify the gap and verify it against an authoritative government source before implementing it.

## Disclaimer

VehicleFeeCalc estimates are not official DMV quotes. State and local fees can change. Always verify the final amount with the applicable government agency.

## License

MIT
