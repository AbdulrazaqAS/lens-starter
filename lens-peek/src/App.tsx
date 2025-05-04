import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";
import { client } from "./client";
import { signer } from "./signer";
import { signMessageWith } from "@lens-protocol/client/viem";
import { useEffect } from "react";

const TESTNET_APP = "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7";

const App = () => {
  useEffect(() => {
    async function setup() {
      const authenticated = await getAuthentication();
      if (authenticated.isErr()) {
        console.error(authenticated.error);
      }
      console.log(authenticated);
      // SessionClient: { ... }
      const sessionClient = authenticated.value;
      console.log(sessionClient);
    }

    setup();
  }, []);

  async function getAuthentication() {
    const authenticated = await client.login({
      onboardingUser: {
        app: TESTNET_APP,
        wallet: signer.address,
      },
      signMessage: signMessageWith(signer),
    });

    return authenticated;
  }

  return (
    <Web3Provider>
      <ConnectKitButton />
    </Web3Provider>
  );
};

export default App;
