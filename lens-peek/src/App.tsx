import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "./utils/client";
import type { SessionClient } from "@lens-protocol/client";

const TESTNET_APP = "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7";

const App = () => {
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const [sessionClient, setSessionClient] = useState<SessionClient | null>(
    null
  );

  async function setupClient() {
    // if (!walletClient || !account.isConnected) return;
    if (!walletClient || !account.isConnected || sessionClient) return;

    const authenticated = await client.login({
      onboardingUser: {
        app: TESTNET_APP,
        wallet: walletClient.account.address,
      },
      signMessage: signMessageWith(walletClient),
    });

    if (authenticated.isErr()) {
      console.error(authenticated.error);
      return;
    }

    setSessionClient(authenticated.value);
    console.log("Address Authenticated");
  }

  // useEffect(() => {
  //   setupClient();
  // }, [walletClient]);

  useEffect(() => {
    if (walletClient && account.isConnected && !sessionClient) {
      console.log("Setting up client");
      setupClient();
    }

    const info = {
      IsConnected: account.isConnected,
      HasWalletClient: Boolean(walletClient),
      HasSessionClient: Boolean(sessionClient),
    };
    console.log(info);
  }, [walletClient, account.isConnected, sessionClient]);

  // useEffect(() => {
  //   console.log("Account:", walletClient?.account.address);
  //   console.log("WalletClient", walletClient);
  //   setupLensClient();
  // }, [account, walletClient]);

  return (
    <div>
      <ConnectKitButton />
      <p>
        Status: {account.status} {account.address} {account.chain?.name}{" "}
        {account.chainId}
      </p>
    </div>
  );
};

export default App;
