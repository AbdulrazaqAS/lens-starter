import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";

import { evmAddress } from "@lens-protocol/client";
import { lastLoggedInAccount, fetchAccountsAvailable } from "@lens-protocol/client/actions";

import {setupOnboardingUser} from "./utils/users";
import { client } from "./utils/client";
import { fetchAppByTxHash, fetchAllUsers } from "./utils/app";

import type { SessionClient } from "@lens-protocol/client";

const LensJobs_URI =
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

  const [app, setApp] = useState<Object>({});
  const [users, setUsers] = useState<Array<Object>>([]);
  const [sessionClient, setSessionClient] = useState<SessionClient | null>(
    null
  );  // TODO: Use the storage something

  async function listConnectedAddressAccounts() {
    if (!client || !walletClient) {
      // console.error("Listing available accounts not ready");
      return;
    }

    const result = await fetchAccountsAvailable(client, {
      managedBy: evmAddress(walletClient.account.address),
      includeOwned: true,
    });
    console.log("Connected Address Accounts", result.value);
    return result.value;
  }

  async function logOutAuthenticatedSession() {
    // It says client has no logout, but may .mutation can be used together with GraphQL command.
    // Check log out in Authentication page
    // const result = await client.logout();
  }

  async function getLastLoggedInAccount() {
    if (!walletClient || !client) {
      // console.error("Getting last logged in account not ready");
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
    // if (!walletClient || !account.isConnected || sessionClient) return;
    if (!walletClient || !account.isConnected) return;

      // setupOnboardingUser({client, walletClient}).then(async () => {
      //   console.log("Session client loaded");
      // });
      // listConnectedAddressAccounts();
    // getLastLoggedInAccount();

    const info = {
      IsConnected: account.isConnected,
      HasWalletClient: Boolean(walletClient),
      HasSessionClient: Boolean(sessionClient),
    };
    console.log(info);
  }, [walletClient, account.isConnected, sessionClient]);

  useEffect(() => {
    fetchAppByTxHash(client).then((app) => {
      console.log("App", app);
      setApp(app);
    });

    fetchAllUsers(client).then((result) => {
      // items: Array<AppUser>: [{account: Account, lastActiveOn: DateTime, firstLoginOn: DateTime}, …]
      const { items, pageInfo } = result;
      setUsers(items);
      console.log("All users:", items);
    });
  }, []);

  return (
    <div>
      <ConnectKitButton />
      {app.address && (
        <div>
          <p>Address {app.address}</p>
          <p>CreatedAt {app.createdAt}</p>
          <p>DefaultFeedAddress {app.defaultFeedAddress}</p>
          <p>GraphAddress {app.graphAddress}</p>
          <p>HasAuthorizationEndpoint {app.hasAuthorizationEndpoint}</p>
          <p>Description {app.metadata.description}</p>
          <p>Developer {app.metadata.developer}</p>
          <p>Name {app.metadata.name}</p>
          <p>Platforms {app.metadata.platforms}</p>
          <p>Tagline {app.metadata.tagline}</p>
          <p>Url {app.metadata.url}</p>
          <p>NamespaceAddress {app.namespaceAddress}</p>
          <p>Owner {app.owner}</p>
          <p>SponsorshipAddress {app.sponsorshipAddress}</p>
          <p>TreasuryAddress {app.treasuryAddress}</p>
          <p>VerificationEnabled {app.verificationEnabled}</p>
        </div>
      )}
      {users.length > 0 && (
        <ol>
          users.map((item, idx) => (
            <li key={idx}>
              {item.account} {item.lastActiveOn} {item.firstLoginOn}
            </li>
          ))
        </ol>
      )}
    </div>
  );
};

export default App;
