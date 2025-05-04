import { client } from "./client";
import { signer } from "./signer";
import { signMessageWith } from "@lens-protocol/client/viem";

const authenticated = await client.login({
  onboardingUser: {
      app: "0x5678…",
          wallet: signer.address,
            },
              signMessage: signMessageWith(signer),
              });

              if (authenticated.isErr()) {
                return console.error(authenticated.error);
                }

                // SessionClient: { ... }
                const sessionClient = authenticated.value;