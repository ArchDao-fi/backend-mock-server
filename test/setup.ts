import { ArchDAO } from "@archdao/archdao-client";
import type { ServerType } from "@hono/node-server";
import { createServer } from "../src/app.ts";

export const SERVER_URL = "http://localhost:3001";
const PORT = 3001;

let server: ServerType | null = null;

export async function globalSetup() {
  server = await createServer(PORT);
  console.log("Test server started on", SERVER_URL);
}

export async function globalTeardown() {
  if (server) {
    await new Promise<void>((resolve) => {
      server!.close(() => resolve());
    });
    server = null;
    console.log("Test server stopped");
  }
}

export const publicClient = new ArchDAO({
  serverURL: SERVER_URL,
});

export const authedClient = new ArchDAO({
  serverURL: SERVER_URL,
  bearer: "test-token",
});
