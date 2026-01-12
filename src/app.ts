import { serve } from "@hono/node-server";
import { createMockServer } from "@scalar/mock-server";

// Create the mocked routes
const app = await createMockServer({
  document: "https://registry.scalar.com/@archdao/apis/archdao/latest",
});

// Start the server
const server = serve({
  fetch: app.fetch,
  port: 3001,
});

["SIGINT", "SIGTERM", "SIGHUP"].forEach((signal) => {
  process.on(signal, () => server.close(() => process.exit()));
});
