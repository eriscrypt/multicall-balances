import { TokenResult } from "../types";

interface Props {
  token: TokenResult | undefined;
}

export const TokenItem: React.FC<Props> = ({ token }: Props) => {
  return (
    <div className="token">
      {token ? (
        <>
          <div className="info">
            <img src={token.logoURI} alt="" />
            <div className="symbol">{token.symbol}</div>
          </div>
          <div className="price">${token.amount}</div>
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};
