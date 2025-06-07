# Hello World MCP Server

A simple Model Context Protocol (MCP) server that demonstrates the basic concepts of MCP by providing "Hello, World!" functionality.

## What is MCP?

The Model Context Protocol (MCP) is an open-source standard that enables AI applications to securely connect to external data sources and tools. This server demonstrates how to create tools that can be used by MCP-compatible clients like Claude Desktop, Cursor, Windsurf, and more.

## Features

This MCP server provides two simple tools:

1. **hello_world** - Returns a greeting message
   - Optional parameter: `name` (string) - Personalizes the greeting
   - Example: "Hello, World!" or "Hello, Alice!"

2. **get_current_time** - Returns the current date and time
   - No parameters required
   - Returns ISO 8601 formatted timestamp

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Installation

1. **Navigate to your project directory**
   ```bash
   cd mpc-hellow-world
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

## Usage

### Option 1: Run directly
```bash
npm start
```

### Option 2: Use as a package (after publishing to npm)
```bash
npx hello-world-mcp-server
```

The server will start and listen for MCP protocol messages via stdin/stdout.

## Integration with MCP Clients

### Claude Desktop

To use this server with Claude Desktop, add the following configuration to your `claude_desktop_config.json` file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hello-world": {
      "command": "node",
      "args": ["/Users/sapirh/Desktop/mpc-hellow-world/build/index.js"]
    }
  }
}
```

### Cursor IDE

In Cursor, go to **Settings > Features > Model Context Protocol** and add:

```json
{
  "hello-world": {
    "command": "node",
    "args": ["/Users/sapirh/Desktop/mpc-hellow-world/build/index.js"]
  }
}
```

### Windsurf (Codeium)

In Windsurf settings, configure MCP servers:

```json
{
  "mcp.servers": {
    "hello-world": {
      "command": "node",
      "args": ["/Users/sapirh/Desktop/mpc-hellow-world/build/index.js"]
    }
  }
}
```

### Cline (VS Code Extension)

Install the Cline extension and add to your MCP configuration:

```json
{
  "mcpServers": {
    "hello-world": {
      "command": "node", 
      "args": ["/Users/sapirh/Desktop/mpc-hellow-world/build/index.js"]
    }
  }
}
```

### Other MCP Clients

For other MCP-compatible applications (Zed, Sourcegraph Cody, etc.), refer to their specific documentation for adding MCP servers.

**Note**: ChatGPT and OpenAI's web interface do not currently support MCP. Use one of the clients listed above.

## Testing the Server

Once configured with an MCP client, you can test the server by asking questions like:

- "Say hello to me"
- "What time is it?"
- "Give me a greeting for John"

The AI assistant will automatically use the appropriate tools from this MCP server to respond.

## Development

### Building
```bash
npm run build
```

### Development with auto-rebuild
```bash
npm run dev
```

This will watch for file changes and automatically rebuild the TypeScript code.

## Project Structure

```
mpc-hellow-world/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript (generated)
├── package.json         # Project configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## How It Works

1. **Server Creation**: Creates an MCP server with tool capabilities
2. **Tool Registration**: Registers the `hello_world` and `get_current_time` tools
3. **Request Handling**: Handles `listTools` and `callTool` requests from MCP clients
4. **Transport**: Uses stdio transport for communication with the MCP client

## Next Steps

Now that you have a working MCP server, you can:

1. **Add more tools**: Extend the server with additional functionality
2. **Add resources**: Provide data sources that clients can read
3. **Add prompts**: Define reusable prompt templates
4. **Connect to APIs**: Integrate with external services and databases
5. **Deploy**: Make your server available to others

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)

## License

MIT License - feel free to use this as a starting point for your own MCP servers! 