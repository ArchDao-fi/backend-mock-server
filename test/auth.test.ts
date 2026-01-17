import assert from "node:assert";
import { describe, it } from "node:test";
import { authedClient, publicClient } from "./setup.ts";

describe("Auth", () => {
  it("POST /auth/nonce - createNonce", async () => {
    const result = await publicClient.auth.createNonce({
      address: "0x634B0A1dACf25Ef55224F25D82CA2de8069d804A",
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.nonce !== undefined);
  });

  it("POST /auth/login - login", async () => {
    // First create a nonce (setup for this test)
    const nonceResult = await publicClient.auth.createNonce({
      address: "0x634B0A1dACf25Ef55224F25D82CA2de8069d804A",
    });

    // Then test login with that nonce
    const result = await publicClient.auth.login({
      address: "0x634B0A1dACf25Ef55224F25D82CA2de8069d804A",
      nonce: nonceResult.data!.nonce,
      signature: "0xmocksignature",
    });
    assert.strictEqual(result.success, true);
    assert.ok(result.data?.token !== undefined);
  });

  it("POST /auth/logout - logout", async () => {
    const result = await authedClient.auth.logout({});
    assert.strictEqual(result.success, true);
  });

  it("GET /auth/nonces - listNonces", async () => {
    const result = await authedClient.auth.listNonces();
    assert.strictEqual(result.success, true);
    assert.ok(Array.isArray(result.data));
  });
});
