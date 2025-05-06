import { txHash } from "@lens-protocol/client";
import { fetchApp } from "@lens-protocol/client/actions";
import { PublicClient } from "@lens-protocol/client";

const APP_TX_HASH = import.meta.env.VITE_APP_TX_HASH;

export async function fetchAppByTxHash(client: PublicClient) {
    const result = await fetchApp(client, {
      txHash: txHash(APP_TX_HASH),
    });
    
    if (result.isErr()) {
        console.error(result.error);
        return;
    }
    
    return result.value;
}