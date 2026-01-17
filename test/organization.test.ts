import assert from "node:assert";
import { describe, it } from "node:test";
import { publicClient } from "./setup.ts";

describe("Organization", () => {
  it("GET /organization - listOrganizations", async () => {
    const result = await publicClient.organization.listOrganizations({}, {});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });

  it("GET /organization/{slug} - getOrganization", async () => {
    const result = await publicClient.organization.getOrganization({
      slug: "example-dao",
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });
});
