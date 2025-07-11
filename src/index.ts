#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import dotenv from "dotenv";
import {
  listProjects,
  fetchThroughput,
  fetchBuildTime,
  fetchCodingRules,
  fetchFeatures,
  fetchRisks,
  fetchTasks,
  fetchTeamMembers,
} from "./lib/api.js";
import yargs from "yargs";
import { createServer } from "http";
import { hideBin } from "yargs/helpers";
import { parse } from "url";

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

let LUSKAD_API_URL: string = argv.url || process.env.API_URL || "https://app.luskad.com/api/v1";
const LUSKAD_API_KEY: string = argv.key || process.env.API_KEY || "";

if (!LUSKAD_API_URL) {
  LUSKAD_API_URL = "https://app.luskad.com/api/v1";
}

if (!LUSKAD_API_KEY) {
  throw new Error(
    "LUSKAD_API_KEY is not set. Please set the LUSKAD_API_KEY environment variable or pass it as an argument."
  );
}

// Store SSE transports by session ID
const sseTransports: Record<string, SSEServerTransport> = {};

function handleApiToolResult(data: any, errorText: string = "Failed to retrieve data") {
  if (!data) {
    return errorText;
  }
  return JSON.stringify(data, null, 2);
}

// Function to create a new server instance with all tools registered
function createServerInstance() {
  const server = new McpServer({
    name: "Luskad",
    description: "Luskad is a tool that allows you to search for and retrieve information from the Luskad API.",
    version: "1.0.0",
    capabilities: {
      resources: {},
      tools: {},
    },
  });

  server.tool("get-current-date", "Get the current date", async () => {
    return {
      content: [{ type: "text", text: new Date().toISOString() }],
    };
  });

  server.tool("list-projects", "List all projects", async () => {
    const data = await listProjects(LUSKAD_API_URL, LUSKAD_API_KEY);
    return {
      content: [
        {
          type: "text",
          text: handleApiToolResult(data, "Failed to retrieve projects"),
        },
      ],
    };
  });

  server.tool(
    "get-throughput",
    "Get the throughput for a project and a given period",
    {
      projectId: z.string().describe("The ID of the project to get the throughput for"),
      startDate: z.string().describe("The start date of the period to get the throughput for"),
      endDate: z.string().describe("The end date of the period to get the throughput for"),
    },
    async ({ projectId, startDate, endDate }) => {
      const data = await fetchThroughput(
        LUSKAD_API_URL,
        LUSKAD_API_KEY,
        projectId,
        startDate,
        endDate
      );
      return {
        content: [
          {
            type: "text",
            text: handleApiToolResult(data, "Failed to retrieve throughput"),
          },
        ],
      };
    }
  );

  server.tool(
    "get-build-time",
    "Get the build time in days for a project and a given period",
    {
      projectId: z.string().describe("The ID of the project to get the throughput for"),
      startDate: z.string().describe("The start date of the period to get the throughput for"),
      endDate: z.string().describe("The end date of the period to get the throughput for"),
    },
    async ({ projectId, startDate, endDate }) => {
      const data = await fetchBuildTime(
        LUSKAD_API_URL,
        LUSKAD_API_KEY,
        projectId,
        startDate,
        endDate
      );
      return {
        content: [
          {
            type: "text",
            text: handleApiToolResult(data, "Failed to retrieve build time"),
          },
        ],
      };
    }
  );

  server.tool(
    "get-coding-rules",
    "Fetch coding rules for a project",
    {
      projectId: z.string().describe("The ID of the project to fetch coding rules for"),
      query: z.string().optional().describe("The query to search for coding rules"),
    },
    async ({ projectId, query }) => {
      const data = await fetchCodingRules(LUSKAD_API_URL, LUSKAD_API_KEY, projectId, query);
      return {
        content: [
          {
            type: "text",
            text: handleApiToolResult(data, "Failed to retrieve coding rules"),
          },
        ],
      };
    }
  );

  server.tool(
    "get-features",
    "Fetch features and issues for a project",
    {
      projectId: z.string().describe("The ID of the project to fetch features for"),
    },
    async ({ projectId }) => {
      const data = await fetchFeatures(LUSKAD_API_URL, LUSKAD_API_KEY, projectId);
      return {
        content: [
          {
            type: "text",
            text: handleApiToolResult(data, "Failed to retrieve features"),
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
      return {
        content: [
          {
            type: "text",
            text: handleApiToolResult(data, "Failed to retrieve risks"),
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
      return {
        content: [
          {
            type: "text",
            text: handleApiToolResult(data, "Failed to retrieve tasks"),
          },
        ],
      };
    }
  );

  server.tool(
    "get-team-members",
    "Fetch team members for a project",
    {
      projectId: z.string().describe("The ID of the project to fetch team members for"),
    },
    async ({ projectId }) => {
      const data = await fetchTeamMembers(LUSKAD_API_URL, LUSKAD_API_KEY, projectId);
      return {
        content: [
          {
            type: "text",
            text: handleApiToolResult(data, "Failed to retrieve team members"),
          },
        ],
      };
    }
  );
  return server;
}

async function main() {
  const transportType = process.env.MCP_TRANSPORT || "stdio";
  if (transportType === "http" || transportType === "sse") {
    const initialPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    let actualPort = initialPort;
    const httpServer = createServer(async (req, res) => {
      const url = parse(req.url || "").pathname;

      // Set CORS headers for all responses
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, MCP-Session-Id, mcp-session-id");

      // Handle preflight OPTIONS requests
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
      }

      try {
        // Create new server instance for each request
        const requestServer = createServerInstance();

        if (url === "/mcp") {
          const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
          });
          await requestServer.connect(transport);
          await transport.handleRequest(req, res);
        } else if (url === "/sse" && req.method === "GET") {
          // Create new SSE transport for GET request
          const sseTransport = new SSEServerTransport("/messages", res);
          // Store the transport by session ID
          sseTransports[sseTransport.sessionId] = sseTransport;
          // Clean up transport when connection closes
          res.on("close", () => {
            delete sseTransports[sseTransport.sessionId];
          });
          await requestServer.connect(sseTransport);
        } else if (url === "/messages" && req.method === "POST") {
          // Get session ID from query parameters
          const parsedUrl = parse(req.url || "", true);
          const sessionId = parsedUrl.query.sessionId as string;

          if (!sessionId) {
            res.writeHead(400);
            res.end("Missing sessionId parameter");
            return;
          }

          // Get existing transport for this session
          const sseTransport = sseTransports[sessionId];
          if (!sseTransport) {
            res.writeHead(400);
            res.end(`No transport found for sessionId: ${sessionId}`);
            return;
          }

          // Handle the POST message with the existing transport
          await sseTransport.handlePostMessage(req, res);
        } else if (url === "/ping") {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("pong");
        } else {
          res.writeHead(404);
          res.end("Not found");
        }
      } catch (error) {
        console.error("Error handling request:", error);
        if (!res.headersSent) {
          res.writeHead(500);
          res.end("Internal Server Error");
        }
      }
    });

    // Function to attempt server listen with port fallback
    const startServer = (port: number, maxAttempts = 10) => {
      httpServer.once("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE" && port < initialPort + maxAttempts) {
          console.warn(`Port ${port} is in use, trying port ${port + 1}...`);
          startServer(port + 1, maxAttempts);
        } else {
          console.error(`Failed to start server: ${err.message}`);
          process.exit(1);
        }
      });

      httpServer.listen(port, () => {
        actualPort = port;
        console.error(
          `Luskad MCP Server running on ${transportType.toUpperCase()} at http://localhost:${actualPort}/mcp and legacy SSE at /sse`
        );
      });
    };

    // Start the server with initial port
    startServer(initialPort);
  } else {
    const server = createServerInstance();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Luskad MCP Server running on stdio");
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
