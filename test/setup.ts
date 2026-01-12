import { ArchDAO } from "@archdao/archdao-client";

export const SERVER_URL = "http://localhost:3001";

export const publicClient = new ArchDAO({
  serverURL: SERVER_URL,
});

export const authedClient = new ArchDAO({
  serverURL: SERVER_URL,
  bearer: "test-token",
});
