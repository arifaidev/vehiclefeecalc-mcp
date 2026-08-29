import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "carfeecalc",
  version: "1.0.0",
});

const money = z.number().finite().min(0);
const state = z.string().trim().min(2).max(40);

function jsonResult(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    structuredContent: data as Record<string, unknown>,
  };
}

server.registerTool(
  "calculate_registration",
  {
    title: "Calculate registration",
    description:
      "Prepare a CarFeeCalc registration estimate request. Numeric state-specific fees are returned only when authoritative fee data is available; the server never invents a fee.",
    inputSchema: {
      state,
      vehicleType: z.string().trim().min(1).default("passenger"),
      modelYear: z.number().int().min(1886).max(2100).optional(),
      vehicleWeight: z.number().finite().min(0).optional(),
      isEV: z.boolean().default(false),
      county: z.string().trim().min(1).optional(),
    },
  },
  async (args) =>
    jsonResult({
      calculator: "registration",
      status: "needs_authoritative_fee_data",
      inputs: args,
      estimate: null,
      source: "https://carfeecalc.com/",
      message:
        "No state fee amount was invented. Use the verified CarFeeCalc state calculator or connect an authoritative fee dataset before returning a numeric estimate.",
    }),
);

server.registerTool(
  "calculate_title",
  {
    title: "Calculate title transfer",
    description:
      "Prepare a CarFeeCalc title-transfer estimate using verified state rules. The server refuses to invent state-specific title or tax amounts.",
    inputSchema: {
      state,
      purchasePrice: money.optional(),
      taxableValue: money.optional(),
      vehicleType: z.string().trim().min(1).default("passenger"),
    },
  },
  async (args) =>
    jsonResult({
      calculator: "title",
      status: "needs_authoritative_fee_data",
      inputs: args,
      estimate: null,
      source: "https://carfeecalc.com/",
      message: "Verified state title and tax rules are required for a numeric result.",
    }),
);

server.registerTool(
  "calculate_vehicle_fee",
  {
    title: "Calculate vehicle fee",
    description:
      "Route a CarFeeCalc request to a registration, title, or out-the-door calculator without inventing unsupported state rules.",
    inputSchema: {
      calculator: z.enum(["registration", "title", "out_the_door"]),
      state,
      purchasePrice: money.optional(),
      isEV: z.boolean().default(false),
    },
  },
  async (args) =>
    jsonResult({
      calculator: args.calculator,
      state: args.state,
      status: "needs_authoritative_fee_data",
      estimate: null,
      source: "https://carfeecalc.com/",
      message: "Connect the verified state fee dataset or use the corresponding CarFeeCalc state calculator for a numeric result.",
    }),
);

server.registerTool(
  "calculate_out_the_door",
  {
    title: "Calculate out-the-door cost",
    description:
      "Prepare a vehicle purchase total from purchase price plus verified state/county tax, title, registration, and plate rules.",
    inputSchema: {
      state,
      purchasePrice: money,
      tradeIn: money.optional(),
      rebate: money.optional(),
      county: z.string().trim().min(1).optional(),
      isEV: z.boolean().default(false),
    },
  },
  async (args) =>
    jsonResult({
      calculator: "out_the_door",
      status: "needs_authoritative_fee_data",
      inputs: args,
      estimate: null,
      lineItems: [],
      source: "https://carfeecalc.com/",
      message:
        "Out-the-door totals require the applicable state's verified taxable-base, tax, title, registration, plate, and conditional-fee rules.",
    }),
);

server.registerTool(
  "get_state_fee_rules",
  {
    title: "Get state fee rules",
    description:
      "Return the currently loaded CarFeeCalc state fee rules and source metadata. The server intentionally does not fabricate rules that are not loaded.",
    inputSchema: { state },
  },
  async ({ state: requestedState }) =>
    jsonResult({
      state: requestedState,
      status: "not_loaded",
      rules: [],
      sources: [],
      source: "https://carfeecalc.com/",
      message:
        "The MCP server exposes the rule interface but does not bundle an authoritative state fee dataset. Use CarFeeCalc's verified state pages or populate verified rules before publishing numeric results.",
    }),
);

server.registerTool(
  "lookup_vin",
  {
    title: "Lookup VIN",
    description:
      "Validate a VIN for downstream vehicle-data lookup. This tool does not pretend to decode a VIN without an approved data source.",
    inputSchema: {
      vin: z.string().trim().regex(/^[A-HJ-NPR-Z0-9]{17}$/i),
    },
  },
  async ({ vin }) =>
    jsonResult({
      vin: vin.toUpperCase(),
      validFormat: true,
      status: "lookup_provider_not_configured",
      vehicle: null,
      source: "https://carfeecalc.com/",
      message:
        "VIN format is valid. Configure an approved VIN/vehicle-data provider before returning decoded vehicle attributes.",
    }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
