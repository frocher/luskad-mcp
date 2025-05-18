#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import { listProjects, fetchCodingRules } from "./lib/api.js";

// Load environment variables from .env file if present
dotenv.config();

const LUSKAD_API_KEY = process.env.LUSKAD_API_KEY || process.argv[2];

if (!LUSKAD_API_KEY) {
  throw new Error(
    "LUSKAD_API_KEY is not set. Please set the LUSKAD_API_KEY environment variable or pass it as an argument."
  );
}

// Get DEFAULT_MINIMUM_TOKENS from environment variable or use default
let DEFAULT_MINIMUM_TOKENS = 10000;
if (process.env.DEFAULT_MINIMUM_TOKENS) {
  const parsedValue = parseInt(process.env.DEFAULT_MINIMUM_TOKENS, 10);
  if (!isNaN(parsedValue) && parsedValue > 0) {
    DEFAULT_MINIMUM_TOKENS = parsedValue;
  } else {
    console.warn(
      `Warning: Invalid DEFAULT_MINIMUM_TOKENS value provided in environment variable. Using default value of 10000`
    );
  }
}

// Create server instance
const server = new McpServer({
  name: "Luskad",
  description:
    "Luskad is a tool that allows you to search for and retrieve information from the Luskad API.",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool("list-projects", "List all projects", async () => {
  return await listProjects(LUSKAD_API_KEY);
});

server.tool(
  "get-coding-rules",
  "Fetch coding rules for a project",
  {
    projectId: z.string().describe("The ID of the project to fetch coding rules for"),
    query: z.string().optional().describe("The query to search for coding rules"),
  },
  async ({ projectId, query }) => {
    return await fetchCodingRules(projectId, query, LUSKAD_API_KEY);
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Luskad MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
