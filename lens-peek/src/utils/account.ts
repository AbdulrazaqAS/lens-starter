import { DateTime } from "@lens-protocol/metadata";
import { setAccountMetadata } from "@lens-protocol/client/actions";
import { AccountMetadataDetails } from "@lens-protocol/metadata";
import { SessionClient, uri } from "@lens-protocol/client";
import { WalletClient } from "viem";
import { handleOperationWith } from "@lens-protocol/client/viem";

export interface AccountDetails {
  account: AccountMetadataDetails;
  lastActiveOn: DateTime;
  firstLoginOn: DateTime;
}

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
  }).andThen(handleOperationWith(walletClient));
  // No need to wait for mining
}
