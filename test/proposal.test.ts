import assert from "node:assert";
import { describe, it } from "node:test";
import { authedClient, publicClient } from "./setup.ts";

describe("Proposal", () => {
  it("GET /proposal - listProposals", async () => {
    const result = await publicClient.proposal.listProposals({}, {});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });

  it("POST /proposal - createProposal", async () => {
    const result = await authedClient.proposal.createProposal({
      organizationId: 1,
      title: "Test Proposal",
      description: "A test proposal description",
      actions: [
        {
          actionType: "treasury_spend",
          recipientAddress: "0x1234567890123456789012345678901234567890",
          amount: 1000,
          token: "USDC",
        },
      ],
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });

  it("GET /proposal/{id} - getProposal", async () => {
    const result = await publicClient.proposal.getProposal({ id: 1 }, {});
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });

  it("PATCH /proposal/{id} - updateProposal", async () => {
    const result = await authedClient.proposal.updateProposal({
      id: 1,
      updateProposal: {
        title: "Updated Proposal Title",
      },
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.id !== undefined);
  });

  it("DELETE /proposal/{id} - deleteProposal", async () => {
    const result = await authedClient.proposal.deleteProposal({ id: 1 });
    assert.strictEqual(result.success, true);
  });

  it("GET /proposal/{id}/stakes - listStakes", async () => {
    const result = await publicClient.proposal.listStakes({ id: 2 }, {});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });

  it("GET /proposal/{id}/trades - listTrades", async () => {
    const result = await publicClient.proposal.listTrades({ id: 2 }, {});
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
    assert.ok(result.pagination !== undefined);
  });
});
