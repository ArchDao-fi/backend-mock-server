import { serve } from "@hono/node-server";
import { createMockServer } from "@scalar/mock-server";
// Your OpenAPI document

// Create the mocked routes
const app = await createMockServer({
  specification: "",
  // Custom logging
  onRequest({ context, operation }) {
    console.log(context.req.method, context.req.path);
  },
});
// Start the server
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  }
);
