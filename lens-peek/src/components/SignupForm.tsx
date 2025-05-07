import { useState } from "react";
import { AccountMetadata, account } from "@lens-protocol/metadata";
import { storageClient } from "../utils/storage-client";
import { immutable } from "@lens-chain/storage-client";
import { chains } from "@lens-chain/sdk/viem";
import { updateAccountMetadata } from "../utils/account";
import { SessionClient } from "@lens-protocol/client";
import { WalletClient } from "viem";

export default function SignupForm({
  walletClient,
  onboardingUserSessionClient,
}: {
  walletClient: WalletClient;
  onboardingUserSessionClient: SessionClient;
}) {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");

  const generateMetadata = () => {
    const metadata = {
      name,
      picture,
      coverPicture,
    };

    return account(metadata);
  };

  async function uplaodMetadata(metadata: AccountMetadata) {
    const { uri } = await storageClient.uploadAsJson(metadata, {
      acl: immutable(chains.testnet.id),
    });

    return uri;
  }

  async function submitForm(e) {
    e.preventDefault();

    const metadata = generateMetadata();
    const metadataUri = await uplaodMetadata(metadata);
    await updateAccountMetadata({
      metadataUri,
      walletClient,
      sessionClient: onboardingUserSessionClient,
    });

    console.log("Account Metadata:", metadata);
  }

  return (
    <form onSubmit={submitForm} className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Signup Form</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        placeholder="Picture URL"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Cover Picture URL"
        value={coverPicture}
        onChange={(e) => setCoverPicture(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 w-full text-white px-4 py-2 rounded"
      >
        Signup
      </button>
    </form>
  );
}
