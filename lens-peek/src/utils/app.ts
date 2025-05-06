import { txHash, evmAddress, PublicClient } from "@lens-protocol/client";
import { fetchApp, fetchAppUsers } from "@lens-protocol/client/actions";

const APP_TX_HASH = import.meta.env.VITE_APP_TX_HASH;
const APP_ADDRESS = import.meta.env.VITE_APP_ADDRESS;

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

export async function fetchAppByAddress(client: PublicClient) {
  const result = await fetchApp(client, {
    app: evmAddress(APP_ADDRESS),
  });
  
  if (result.isErr()) {
      console.error(result.error);
      return;
  }
  
  return result.value;
}

export async function fetchAllUsers(client:PublicClient){
  const result = await fetchAppUsers(client, {
    app: evmAddress(APP_ADDRESS),
  });

  if (result.isErr()) {
    console.error(result.error);
    return
  }

  // items: Array<AppUser>: [{account: Account, lastActiveOn: DateTime, firstLoginOn: DateTime}, …]
  // const { items, pageInfo } = result.value;

  return result.value;
}

export async function fetchUsersByQuery({client, query}:{client:PublicClient, query:Object}){
  // Query eg:{localNameQuery: "John"}
  const result = await fetchAppUsers(client, {
    filter:{
      searchBy: query,
    },
    app: evmAddress(APP_ADDRESS),
  });
  
  if (result.isErr()) {
    console.error(result.error);
    return
  }
  
  // items: Array<AppUser>: [{account: Account, lastActiveOn: DateTime, firstLoginOn: DateTime}, …]
  // const { items, pageInfo } = result.value;
  return result.value;
}