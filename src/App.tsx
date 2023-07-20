import { useWallet } from "./hooks/useWallet";
import { Token } from "./types";
import { TokenItem } from "./components/Token";
import { useBalances } from "./hooks/useBalances";
import polygonTokens from "./tokens/137.json";

function App() {
  const { isConnected, address, shortAddress, connectors, connect, disconnect } =
    useWallet();

  const tokens = Object.values(polygonTokens.tokens) as Token[];
  const balances = useBalances(address, tokens);

  return (
    <>
      <div className="navbar">
        {isConnected ? (
          <>
            <div className="address">{shortAddress}</div>
            <button className="btn" onClick={() => disconnect()}>
              Disconnect
            </button>
          </>
        ) : (
          <>
            {connectors.map((connector, index) => (
              <button
                className="btn"
                key={index}
                onClick={() => connect({ connector })}
              >
                {connector.id}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="tokens">
        {balances && balances.length && balances.map((token, index) => (
          <TokenItem key={index} token={token} />
        ))}
      </div>
    </>
  );
}

export default App;
