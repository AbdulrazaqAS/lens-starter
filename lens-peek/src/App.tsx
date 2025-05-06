import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { signMessageWith } from "@lens-protocol/client/viem";
import { client } from "./utils/client";
import { evmAddress } from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { lastLoggedInAccount } from "@lens-protocol/client/actions";
import { createAndUploadAppMetadata } from "./utils/createAndUploadAppMetadata";
import { deployApp } from "./utils/deployApp";

import type { SessionClient } from "@lens-protocol/client";

const TESTNET_APP = "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7";
const uri =
  "lens://50efa5c55fb75422540b9227067c97f706bfeeb3e1e46d24e322873a1f493450";
const admins = [
  "0xDaaE14a470e36796ADf9c75766D3d8ADD0a3D94c",
  "0x09938A51D5AF9c3ee0262865dba74F78DCFC99a6",
];

// Read Authentication > Advanced > Authentication Tokens: To authenticated your app's users
// TODO: Is account needed, walletClient has account inside
const App = () => {
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const [sessionClient, setSessionClient] = useState<SessionClient | null>(
    null
  );
  const [appUri, setAppUri] = useState("");

  async function setupOnboardingClient() {
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

  async function setupBuilderClient() {
    if (!walletClient || !account.isConnected || sessionClient) return;

    const authenticated = await client.login({
      builder: {
        address: walletClient.account.address,
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

  async function listConnectedAddressAccounts() {
    if (!client || !walletClient) {
      console.error("Listing available accounts not ready");
      return;
    }

    const result = await fetchAccountsAvailable(client, {
      managedBy: evmAddress(walletClient.account.address),
      includeOwned: true,
    });
    console.log("Connected Address Accounts", result);
    return result;
  }

  async function logOutAuthenticatedSession() {
    // It says client has no logout, but may .mutation can be used together with GraphQL command.
    // Check log out in Authentication page
    // const result = await client.logout();
  }

  async function getLastLoggedInAccount() {
    if (!walletClient || !client) {
      console.error("Getting last logged in account not ready");
      return;
    }

    const result = await lastLoggedInAccount(client, {
      address: evmAddress(walletClient!.account!.address),
      // app: evmAddress{TESTNET_APP}  // Specific app, omit for all apps
    });

    if (result.isErr()) {
      console.error("Error getting last logged in account:", result.error);
      return;
    }
    console.log("Last logged in account", result);

    return result;
  }

  useEffect(() => {
    if (walletClient && account.isConnected && !sessionClient) {
      console.log("Setting up client");
      // setupBuilderClient().then(async () => {
      //   const resource = await createAndUploadAppMetadata();
      //   setAppUri(resource.uri);
      //   console.log("Reosurce", resource);
      // });

      const result = deployApp({
        admins,
        sessionClient: sessionClient!,
        metadataUri: uri,
      });
    }

    // listConnectedAddressAccounts();
    // getLastLoggedInAccount();

    const info = {
      IsConnected: account.isConnected,
      HasWalletClient: Boolean(walletClient),
      HasSessionClient: Boolean(sessionClient),
    };
    console.log(info);
  }, [walletClient, account.isConnected, sessionClient]);

  return (
    <div>
      <ConnectKitButton />
      <p>
        Status: {account.status} {account.address} {account.chain?.name}{" "}
        {account.chainId}
      </p>
      <p>App URI: {appUri}</p>
    </div>
  );
};

export default App;
