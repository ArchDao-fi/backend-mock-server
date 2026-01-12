import assert from "node:assert";
import { describe, it } from "node:test";
import { authedClient } from "./setup.ts";

describe("Admin", () => {
  it("PATCH /admin/user/{id}/role - changeUserRole", async () => {
    const result = await authedClient.admin.changeUserRole({
      id: 3,
      requestBody: { role: "admin" },
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });

  it("GET /admin/audit - listAuditLogs", async () => {
    const result = await authedClient.admin.listAuditLogs({});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });
});
