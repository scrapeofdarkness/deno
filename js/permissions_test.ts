// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
import { testPerm, assert, assertEquals } from "./test_util.ts";

const knownPermissions: Deno.Permission[] = [
  "run",
  "read",
  "write",
  "net",
  "env",
  "highPrecision"
];

for (let grant of knownPermissions) {
  testPerm({ [grant]: true }, function envGranted() {
    const perms = Deno.permissions();
    assert(perms !== null);
    for (const perm in perms) {
      assertEquals(perms[perm], perm === grant);
    }

    Deno.revokePermission(grant);

    const revoked = Deno.permissions();
    for (const perm in revoked) {
      assertEquals(revoked[perm], false);
    }
  });
}
