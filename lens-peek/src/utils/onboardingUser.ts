import { client } from "./client";
import { signer } from "./signer";
import { signMessageWith } from "@lens-protocol/client/viem";

const TESTNET_APP = "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7";

const authenticated = await client.login({
  onboardingUser: {
    app: TESTNET_APP,
    wallet: signer.address,
  },
  signMessage: signMessageWith(signer),
});

if (authenticated.isErr()) {
  console.error(authenticated.error);
}
console.log(authenticated);
// SessionClient: { ... }
const sessionClient = authenticated.value;
console.log(sessionClient);
