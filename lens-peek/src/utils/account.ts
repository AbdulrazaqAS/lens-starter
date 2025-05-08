import { DateTime } from "@lens-protocol/metadata";
import {
  setAccountMetadata,
  createAccountWithUsername,
  fetchAccount,
  switchAccount,
} from "@lens-protocol/client/actions";
import { AccountMetadataDetails } from "@lens-protocol/metadata";
import {
  AnyClient,
  SessionClient,
  uri,
  txHash,
  never,
  evmAddress,
} from "@lens-protocol/client";
import { WalletClient } from "viem";
import { handleOperationWith } from "@lens-protocol/client/viem";

export interface AccountDetails {
  account: AccountMetadataDetails;
  lastActiveOn: DateTime;
  firstLoginOn: DateTime;
}

export async function createNewAccountWithUsername({
  metadataUri,
  sessionClient,
  walletClient,
}: {
  metadataUri: string;
  sessionClient: SessionClient;
  walletClient: WalletClient;
}) {
  const result = await createAccountWithUsername(sessionClient, {
    username: { localName: "wagmi" },
    metadataUri: uri(metadataUri),
  })
    .andThen(handleOperationWith(walletClient))
    .andThen(sessionClient.waitForTransaction);

  if (result.isErr()) {
    console.error("Transaction failed:", result.error);
    throw result.error;
  }

  return result.value;
}

// TODO: Handle error
export async function updateAccountMetadata({
  metadataUri,
  sessionClient,
  walletClient,
}: {
  metadataUri: string;
  sessionClient: SessionClient;
  walletClient: WalletClient;
}) {
  await setAccountMetadata(sessionClient, {
    metadataUri: uri(metadataUri),
  }).andThen(handleOperationWith(walletClient)); // TODO: sponsor this
  // No need to wait for mining
}

export async function fetchAccountByTxHash({
  client,
  trxHash,
}: {
  client: AnyClient;
  trxHash: string;
}) {
  const result = await fetchAccount(client, {
    txHash: txHash(trxHash),
  });

  if (result.isErr()) {
    console.error("Fetching failed:", result.error);
    throw result.error;
  }

  return result.value;
}

export async function switchToAccount({
  sessionClient,
  address,
}: {
  sessionClient: SessionClient;
  address: string;
}) {
  const result = await sessionClient.switchAccount({
    account: evmAddress(address) ?? never("Account not found"),
  });

  if (result.isErr()) {
    throw result.error;
  }

  return result.value;
}
