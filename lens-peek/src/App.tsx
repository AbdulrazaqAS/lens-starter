import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";

const TESTNET_APP = "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7";

const App = () => {
  const account = useAccount();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <div>
      <ConnectKitButton />
      <p>
        Status: {account.status} {account.address} {account.chain?.name}{" "}
        {account.chainId}
      </p>
    </div>
  );
};

export default App;
