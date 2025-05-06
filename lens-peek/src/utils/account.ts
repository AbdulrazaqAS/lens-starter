import { MetadataAttributeType, account } from "@lens-protocol/metadata";

export const metadata = account({
  name: "Jane Doe",
  bio: "I am a photographer based in New York City.",
  picture: "lens://4f91cab87ab5e4f5066f878b72…",
  coverPicture: "lens://4f91cab87ab5e4f5066f8…",
  attributes: [
    {
      key: "twitter",
      type: MetadataAttributeType.STRING,
      value: "https://twitter.com/janedoexyz",
    },
    {
      key: "dob",
      type: MetadataAttributeType.DATE,
      value: "1990-01-01T00:00:00Z",
    },
    {
      key: "enabled",
      type: MetadataAttributeType.BOOLEAN,
      value: "true",
    },
    {
      key: "height",
      type: MetadataAttributeType.NUMBER,
      value: "1.65",
    },
    {
      key: "settings",
      type: MetadataAttributeType.JSON,
      value: '{"theme": "dark"}',
    },
  ],
});