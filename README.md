# Luskad MCP

A Model Context Protocol (MCP) server that provides access to coding rules and examples for your projects.

## Features

- **Project Management**: Retrieve all available projects with their details
- **Coding Rules**: Search and access coding standards within specific projects
- **Team Collaboration**: Get team member information and project contacts
- **Progress Tracking**: Monitor project progress, risks, and tasks
- **Feature Management**: Access project features and their associated issues
- **Flexible Configuration**: Support for environment variables and command-line arguments
- **Multi-Platform**: Compatible with Cursor, Windsurf, VS Code, and Claude Desktop

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cursor, Windsurf, Claude Desktop or another MCP Client

You also need to create an account on [luskad.com application](https://app.luskad.com) and generate your API token.

## Getting started

### Install in Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

```json
{
  "mcpServers": {
    "Luskad": {
      "command": "npx",
      "args": ["-y", "@acmada/luskad-mcp"]
    }
  }
}
```

### Install in Windsurf

Add this to your Windsurf MCP config file. See [Windsurf MCP docs](https://docs.windsurf.com/windsurf/mcp) for more info.

```json
{
  "mcpServers": {
    "luskad": {
      "command": "npx",
      "args": ["-y", "@acmada/luskad-mcp"]
    }
  }
}
```


### Install in VSCode

Add this to your VS Code MCP config file. See [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

```json
{
  "servers": {
    "luskad": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@acmada/luskad-mcp"]
    }
  }
}
```

### Install in Claude Desktop

Add this to your Claude Desktop `claude_desktop_config.json` file. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

```json
{
  "mcpServers": {
    "luskad": {
      "command": "npx",
      "args": ["-y", "@acmada/luskad-mcp"]
    }
  }
}
```

### Available Tools

#### list-projects
Retrieves all available projects.

#### get-coding-rules
Search coding rules for a given project. Parameters:
- `projectId`: Project to search for coding rules
- `query`: (Optional) Search query



## Development

1. Clone the repository:
```bash
git clone https://github.com/frocher/luskad-mcp.git
cd luskad-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build
```bash
npm run build
```

### Configuration

Create a `.env` file in the root directory with the following variables:
```env
API_URL=https://app.luskad.com/api/v1
API_KEY=<your api key>
```

Or provide the URL via command line:
```bash
node dist/index.js --url http://your-api-url --key <your api key>
```

### Local configuration example
```json
{
  "mcpServers": {
    "luskad": {
      "command": "npx",
      "args": [
        "tsx", "/path/to/folder/luskad-mcp/src/index.ts",
        "--url", "http://localhost:3000/api/v1",
        "--key", "<your personal key>"
      ]
    }
  }
}
```

### Testing with MCP Inspector

```bash
npx -y @modelcontextprotocol/inspector npx @acmada/luskad-mcp@latest
```


## License

MIT License - see [LICENSE](LICENSE) for details.
