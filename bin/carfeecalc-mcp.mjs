#!/usr/bin/env node
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entry = path.join(root, "server", "src", "index.ts");
const tsx = process.platform === "win32"
  ? path.join(root, "node_modules", ".bin", "tsx.cmd")
  : path.join(root, "node_modules", ".bin", "tsx");

const child = spawn(tsx, [entry], { stdio: "inherit", cwd: root });
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
child.on("error", (error) => {
  console.error(`Failed to start CarFeeCalc MCP server: ${error.message}`);
  process.exit(1);
});
