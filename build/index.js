#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// ↑ Main MCP server class (like Express's app)
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// ↑ Communication layer using stdin/stdout (like Express's HTTP transport)
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError, } from "@modelcontextprotocol/sdk/types.js";
/**
 * Create and configure the MCP server
 */
const server = new Server({
    name: "hello-world-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {}
    }
});
/**
 * Handler for listing available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "hello_world",
                description: "Returns a friendly 'Hello, World!' greeting",
                inputSchema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Optional name to personalize the greeting"
                        }
                    },
                    additionalProperties: false
                }
            },
            {
                name: "get_current_time",
                description: "Returns the current date and time",
                inputSchema: {
                    type: "object",
                    properties: {},
                    additionalProperties: false
                }
            }
        ]
    };
});
/**
 * Handler for executing tools
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name: toolName, arguments: args } = request.params;
    switch (toolName) {
        case "hello_world": {
            const name = args?.name;
            const greeting = name ? `Hello, ${name}!` : "Hello, World!";
            return {
                content: [
                    {
                        type: "text",
                        text: greeting
                    }
                ]
            };
        }
        case "get_current_time": {
            const currentTime = new Date().toISOString();
            return {
                content: [
                    {
                        type: "text",
                        text: `Current time: ${currentTime}`
                    }
                ]
            };
        }
        default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
    }
});
/**
 * Start the server
 */
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // This will keep the process running
    console.error("Hello World MCP Server running on stdio");
}
// Handle process termination gracefully
const handleShutdown = () => {
    console.error("Shutting down server...");
    process.exit(0);
};
process.on('SIGINT', handleShutdown); // Ctrl+C
process.on('SIGTERM', handleShutdown); // System termination
// Start the server
runServer().catch((error) => {
    console.error("Failed to run server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map