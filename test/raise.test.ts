import assert from "node:assert";
import { describe, it } from "node:test";
import { authedClient, publicClient } from "./setup.ts";

describe("Raise", () => {
  it("GET /raise - listRaises", async () => {
    const result = await publicClient.raise.listRaises({}, {});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });

  it("GET /raise/{id} - getRaise", async () => {
    const result = await publicClient.raise.getRaise({ id: 1 }, {});
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });

  it("PATCH /raise/{id} - updateRaise", async () => {
    const result = await authedClient.raise.updateRaise({
      id: 1,
      requestBody: { acceptedAmount: 60000 },
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });

  it("GET /raise/{id}/contributions - listContributions", async () => {
    const result = await publicClient.raise.listContributions({ id: 1 }, {});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });
});
