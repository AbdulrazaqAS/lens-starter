import { MetadataAttributeType, app } from "@lens-protocol/metadata";
import { storageClient } from "./storage-client";
import { immutable } from "@lens-chain/storage-client";
import { chains } from "@lens-chain/sdk/viem";

const metadata = app({
  name: "LensJobs",
  tagline: "Lens Protocol Freelance site",
  description: "Platform for freelancers and hirers",
  developer: "AdulrazaqAS <abdulrazaq2621@gmail.com>",
  url: "https://crowdfunding-nu-two.vercel.app/",
  platforms: ["web", "ios", "android"],
});

export async function createAndUploadAppMetadata() {
  const resource = await storageClient.uploadAsJson(metadata, {
    acl: immutable(chains.testnet.id),
  });

  console.log("Resource:", resource);
  console.log("App URI:", resource.uri);
  return resource;
}
