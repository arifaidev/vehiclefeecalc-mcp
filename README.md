# CarFeeCalc Cursor Plugin

CarFeeCalc is a Cursor/Agent Plugin for building, testing, researching, and maintaining vehicle registration and out-the-door fee calculators for [CarFeeCalc.com](https://carfeecalc.com/).

CarFeeCalc currently publishes 18 state calculators, with fees traced to official state DMV/revenue sources and local sales-tax rates looked up from ZIP codes where applicable.

## What it includes

- **vehicle-fee-calculator** — calculator architecture, itemized totals, state isolation, and fee composition.
- **state-fee-research** — research workflow for official state DMV/BMV/revenue rules.
- **calculator-testing** — regression, edge-case, rounding, and invariant testing.
- **vehiclefeecalc-seo** — state/calculator SEO and programmatic-page guidance.
- **fee-source-verification** — provenance, effective-date, and stale-data audits.
- **vehicle-data-and-vin** — VIN/vehicle-data integration boundaries and error handling.
- **out-the-door-calculator** — purchase price, tax, title, registration, plates, and conditional charges.

## MCP server

The repository also ships an MCP server exposing safe tools for registration, title, vehicle-fee routing, out-the-door calculations, state-rule lookup, and VIN format validation.

The server is intentionally conservative: it does not invent state-specific numeric fees when authoritative data is not loaded. Use CarFeeCalc's verified state pages or connect an approved fee dataset before claiming a numeric result.

### Run locally

```bash
cd server
npm install
npm start
```

### Run through the repository package

```bash
npx -y github:arifaidev/vehiclefeecalc-mcp
```

The root package exposes the `carfeecalc-mcp` executable and the repository includes `.mcp.json` for Cursor Directory discovery.

## Cursor Directory

Cursor Directory accepts public Git repositories and auto-detects plugin components such as `plugin.json`, `.mcp.json`, skills, rules, agents, and hooks. Submit this repository at https://cursor.directory/plugins/new?type=mcp_server after pushing the latest changes.

## Accuracy policy

Do not fabricate DMV, title, registration, sales-tax, plate, EV, or local fee values. When a value is missing, changed, ambiguous, or unsupported, verify it against an authoritative government source and record the source and effective/verification date.

## Disclaimer

CarFeeCalc provides estimates and is not affiliated with any DMV, state agency, or tax authority. Dealer documentation fees, dealer add-ons, and market adjustments may not be included. Users should verify final amounts with the applicable government agency and transaction documents.

## License

MIT
