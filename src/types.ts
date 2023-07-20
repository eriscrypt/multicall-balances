export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

export interface TokenResult extends Token {
  amount: string;
}