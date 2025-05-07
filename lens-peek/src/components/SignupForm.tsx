import { useState } from "react";

type MetadataAttributeType = "STRING" | "DATE" | "BOOLEAN" | "NUMBER" | "JSON";

interface Attribute {
  key: string;
  type: MetadataAttributeType;
  value: string;
}

export default function SignupForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([
    { key: "twitter", type: "STRING", value: "https://twitter.com/" },
    { key: "dob", type: "DATE", value: "" },
    { key: "enabled", type: "BOOLEAN", value: "true" },
    { key: "height", type: "NUMBER", value: "" },
    { key: "settings", type: "JSON", value: '{"theme": "dark"}' },
  ]);

  const handleAttributeChange = (index: number, field: keyof Attribute, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { key: "", type: "STRING", value: "" }]);
  };

  const generateMetadata = () => {
    const metadata = {
      name,
      bio,
      picture,
      coverPicture,
      attributes,
    };

    console.log("Generated metadata:", metadata);
    alert("Metadata generated. Check console.");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Signup Form</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full border p-2 rounded"
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

      <div>
        <h3 className="font-semibold mt-4">Attributes</h3>
        {attributes.map((attr, index) => (
          <div key={index} className="flex gap-2 my-2">
            <label className="w-17">{attr.key.toUpperCase()}</label>
            <input
              placeholder="Value"
              value={attr.value}
              onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
              className="border p-2 rounded w-1/2"
            />
          </div>
        ))}
        <button
          onClick={addAttribute}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add Attribute
        </button>
      </div>

      <button
        onClick={generateMetadata}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generate Metadata
      </button>
    </div>
  );
}
