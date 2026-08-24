# VehicleFeeCalc MCP Server

A real MCP (Model Context Protocol) server for VehicleFeeCalc.com, designed for Cursor and other MCP-compatible clients.

## Current tools

- `calculate_vehicle_fee`
- `calculate_registration`
- `calculate_title`
- `calculate_out_the_door`
- `get_state_fee_rules`
- `lookup_vin`

## Important accuracy behavior

The server deliberately refuses to invent state-specific DMV fees. The initial implementation provides the MCP tool interface, strict input validation, structured responses, and safe placeholders for the authoritative fee dataset and VIN provider.

Before returning numeric state estimates, populate a verified fee dataset with source URLs, effective dates, verification dates, and jurisdiction-specific rules.

## Local setup

Requirements: Node.js 20+.

```bash
cd server
npm install
npm run typecheck
npm start
```

The server uses MCP stdio transport, so it is intended to be launched by an MCP client rather than visited in a browser.

## Cursor configuration

For a local checkout, add the server to Cursor's MCP configuration using the project's Node/tsx command. Example:

```json
{
  "mcpServers": {
    "vehiclefeecalc": {
      "command": "npx",
      "args": ["tsx", "/ABSOLUTE/PATH/TO/vehiclefeecalc-mcp/server/src/index.ts"]
    }
  }
}
```

For a published npm package, replace the local `tsx` invocation with the package's published executable when one is released.

## Production roadmap

1. Add verified state fee data sourced from official state agencies.
2. Add source/effective-date metadata to every rule.
3. Add automated calculator tests for every implemented state.
4. Connect an approved VIN provider if VIN decoding is required.
5. Publish the MCP package and provide a stable `npx` installation command.
