import { MetadataAttributeType, app } from "@lens-protocol/metadata";
import { storageClient } from "@lens-protocol/client/test-utils";

const metadata = app({
  name: "LensJobs",
  tagline: "Lens Protocol Freelance site",
  description: "Platform for freelancers and hirers",
  developer: "AdulrazaqAS <abdulrazaq2621@gmail.com>",
  platforms: ["web", "ios", "android"],
});

const { uri } = storageClient.create;
