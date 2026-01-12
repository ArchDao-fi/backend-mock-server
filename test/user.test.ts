import assert from "node:assert";
import { describe, it } from "node:test";
import { authedClient, publicClient } from "./setup.ts";

describe("User", () => {
  it("GET /user - listUsers", async () => {
    const result = await authedClient.user.listUsers({});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });

  it("GET /user/{id} - getUser", async () => {
    const result = await publicClient.user.getUser({ id: 1 });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });

  it("PATCH /user/{id} - updateUser", async () => {
    const result = await authedClient.user.updateUser({
      id: 1,
      requestBody: { name: "Updated Name" },
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });
});
