import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl?.startsWith("file:")) {
  console.error("DATABASE_URL must be a SQLite file URL, for example file:./sharing-heli.db");
  process.exit(1);
}

const configuredPath = decodeURIComponent(databaseUrl.slice("file:".length).split("?")[0]);
const databasePath = path.isAbsolute(configuredPath)
  ? configuredPath
  : path.resolve(process.cwd(), "prisma", configuredPath);

fs.mkdirSync(path.dirname(databasePath), { recursive: true });
fs.closeSync(fs.openSync(databasePath, "a", 0o600));

const npx = process.platform === "win32" ? "npx.cmd" : "npx";

function runPrisma(args) {
  const result = spawnSync(npx, ["prisma", ...args], { stdio: "inherit", env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

runPrisma(["migrate", "deploy"]);

if (process.argv.includes("--seed")) {
  runPrisma(["db", "seed"]);
}

console.log(`Database ready at ${databasePath}`);
