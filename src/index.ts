#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import { listProjects, fetchCodingRules, fetchRisks, fetchTasks } from "./lib/api.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Load environment variables from .env file if present
dotenv.config();

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("url", {
    type: "string",
    description: "API URL",
  })
  .option("key", {
    type: "string",
    description: "API Key",
  })
  .parseSync();

let LUSKAD_API_URL = argv.url || process.env.API_URL;
const LUSKAD_API_KEY = argv.key || process.env.API_KEY;

if (!LUSKAD_API_URL) {
  LUSKAD_API_URL = "https://app.luskad.com/api/v1";
}

if (!LUSKAD_API_KEY) {
  throw new Error(
    "LUSKAD_API_KEY is not set. Please set the LUSKAD_API_KEY environment variable or pass it as an argument."
  );
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
  const data = await listProjects(LUSKAD_API_URL, LUSKAD_API_KEY);

  if (!data) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve themes data",
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
});

server.tool(
  "get-coding-rules",
  "Fetch coding rules for a project",
  {
    projectId: z.string().describe("The ID of the project to fetch coding rules for"),
    query: z.string().optional().describe("The query to search for coding rules"),
  },
  async ({ projectId, query }) => {
    const data = await fetchCodingRules(LUSKAD_API_URL, LUSKAD_API_KEY, projectId, query);

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve coding rules",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "get-risks",
  "Fetch risks for a project",
  {
    projectId: z.string().describe("The ID of the project to fetch risks for"),
    query: z.string().optional().describe("The query to search for risks"),
  },
  async ({ projectId, query }) => {
    const data = await fetchRisks(LUSKAD_API_URL, LUSKAD_API_KEY, projectId, query);

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve risks",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "get-tasks",
  "Fetch tasks for a project",
  {
    projectId: z.string().describe("The ID of the project to fetch tasks for"),
    query: z.string().optional().describe("The query to search for tasks"),
  },
  async ({ projectId, query }) => {
    const data = await fetchTasks(LUSKAD_API_URL, LUSKAD_API_KEY, projectId, query);

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve tasks",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
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
