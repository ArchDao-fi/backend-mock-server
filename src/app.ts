import { serve, type ServerType } from "@hono/node-server";
import { createMockServer } from "@scalar/mock-server";

export async function createServer(port = 3001): Promise<ServerType> {
  const app = await createMockServer({
    document: "https://registry.scalar.com/@archdao/apis/archdao/latest",
  });

  const server = serve({
    fetch: app.fetch,
    port,
  });

  return server;
}

// Run directly (not imported)
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const server = await createServer(3001);
  console.log("Mock server running on http://localhost:3001");

  ["SIGINT", "SIGTERM", "SIGHUP"].forEach((signal) => {
    process.on(signal, () => server.close(() => process.exit()));
  });
}
