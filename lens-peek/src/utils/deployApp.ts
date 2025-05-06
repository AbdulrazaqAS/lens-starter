import { SessionClient, evmAddress, uri } from "@lens-protocol/client";
import { createApp } from "@lens-protocol/client/actions";
import { handleOperationWith } from "@lens-protocol/client/viem";
import { WalletClient } from "viem";

export async function deployApp({
  admins,
  sessionClient,
  metadataUri,
  walletClient,
}: {
  admins: Array<string>;
  sessionClient: SessionClient;
  metadataUri: string;
  walletClient: WalletClient;
}) {
  const config = {
    admins: admins.map(evmAddress),
    metadataUri: uri(metadataUri),
    defaultFeed: {
      globalFeed: true,
    },
    graph: {
      globalGraph: true,
    },
    namespace: {
      globalNamespace: true,
    },
  };

  const result = await createApp(sessionClient, config)
    .andThen(handleOperationWith(walletClient))
    .andThen(sessionClient.waitForTransaction);

  if (result.isErr()) {
    console.error("Error deploying app:", result.error);
    return null;
  }

  console.log("App deployed:", result.value);
  return result.value;
}
