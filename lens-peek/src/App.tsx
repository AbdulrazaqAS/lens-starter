import { ConnectKitButton } from "connectkit";
import { useAccount, useWalletClient } from "wagmi";

const TESTNET_APP = "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7";

const App = () => {
  const account = useAccount();

  return (
    <div>
      <ConnectKitButton />
      {account.isDisconnected && <div>Not connected</div>}
      {account.isConnected && <div>Connected Wallet: {account.address}</div>}
    </div>
  );
};

export default App;
