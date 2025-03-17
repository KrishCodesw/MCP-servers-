import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from 'zod';

const server = new McpServer({
    name: "Weather Server",
    description: "A server that provides Weather articles",
    version: "1.0.0"
  });

  async function getWeatherbycity(city) {
    if(city.toLowerCase() === "new york") {
      return {temperature: "10C", forecast: "High chances of rain"}
    }
    if(city.toLowerCase() === "delhi") {
      return {temperature: "50C", forecast: "High chances of dhoop"}
    }
    if(city.toLowerCase() === "mumbai") {
      return {temperature: "40C", forecast: "High chances of green rain"}
    }
    return {temperature:null,forecast:"Couldn't find weather for the city"}
  }

  server.tool("news",
    { city: z.string() },
    async ({ city}) => {
    return {content: [{ type: "text", text:JSON.stringify(await getWeatherbycity(city))  }]}
    }
  );


async function init(){
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

init();