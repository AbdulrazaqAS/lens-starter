import { PublicClient } from "@lens-protocol/client";
import { WalletClient } from "viem";
import { signMessageWith } from "@lens-protocol/client/viem";

const APP_ADDRESS = import.meta.env.VITE_APP_ADDRESS;

async function setupOnboardingClient({
  client,
  walletClient,
}: {
  client: PublicClient;
  walletClient: WalletClient;
}) {
  const authenticated = await client.login({
    onboardingUser: {
      app: APP_ADDRESS,
      wallet: walletClient.account!.address,
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
