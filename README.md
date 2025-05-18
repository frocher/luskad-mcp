# Luskad MCP

A Model Context Protocol (MCP) server that provides access to coding rules and examples for your projects.

## Features

- Retrieve all available projects
- Search coding rules within a specific project
- Configurable API endpoint
- Environment variable support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cursor, Windsurf, Claude Desktop or another MCP Client

## Getting started

### Install in Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

```json
{
  "mcpServers": {
    "Luskad": {
      "command": "npx",
      "args": ["-y", "@acmada/luskad-mcpp@latest"]
    }
  }
}
```

### Install in Windsurf

TODO

### Install in VSCode

TODO

### Install in Claude Desktop

Add this to your Claude Desktop `claude_desktop_config.json` file. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

```json
{
  "mcpServers": {
    "Luskad": {
      "command": "npx",
      "args": ["-y", "@acmada/luskad-mcp@latest"]
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
      "args": ["tsx", "/path/to/folder/luskad-mcp/src/index.ts"]
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