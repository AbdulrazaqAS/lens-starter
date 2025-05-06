import { PublicClient } from "@lens-protocol/client";
import { WalletClient } from "viem";
import { signMessageWith } from "@lens-protocol/client/viem";

const APP_ADDRESS = import.meta.env.VITE_APP_ADDRESS;

async function setupOnboardingUser({
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

  console.log("Onboarding user authenticated");
  return authenticated.value;
}

async function setupBuilderUser({
  client,
  walletClient,
}: {
  client: PublicClient;
  walletClient: WalletClient;
}) {
  const authenticated = await client.login({
    builder: {
      address: walletClient.account!.address,
    },
    signMessage: signMessageWith(walletClient),
  });

  if (authenticated.isErr()) {
    console.error(authenticated.error);
    return;
  }

  console.log("Builder user authenticated");
  return authenticated.value;
}

async function setupAccountOwnerUser({
  client,
  walletClient,
  account
}: {
  client: PublicClient;
  walletClient: WalletClient;
}) {
  const authenticated = await client.login({
    accountOwner: {
      account: account,
      app: APP_ADDRESS,
      owner: walletClient.account!.address,
    },
    signMessage: signMessageWith(walletClient),
  });

  if (authenticated.isErr()) {
    console.error(authenticated.error);
    return;
  }

  console.log("Account owner user authenticated");
  return authenticated.value;
}

async function setupAccountManagerUser({
  client,
  walletClient,
  account
}: {
  client: PublicClient;
  walletClient: WalletClient;
}) {
  const authenticated = await client.login({
    accountManager: {
      account: account,
      app: APP_ADDRESS,
      manager: walletClient.account!.address,
    },
    signMessage: signMessageWith(walletClient),
  });

  if (authenticated.isErr()) {
    console.error(authenticated.error);
    return;
  }

  console.log("Account manager user authenticated");
  return authenticated.value;
}
