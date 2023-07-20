import { useMultipleContractSingleData } from "@/state/multicall/hooks";
import { useMemo } from "react";
import { isAddress, Address } from "viem";
import { erc20ABI } from "wagmi";
import { useWallet } from "./useWallet";
import { Token, TokenResult } from "@/types";
import { formatUnits } from 'viem'

export function useBalances(
  account?: string,
  tokens?: Token[]
): (TokenResult | undefined)[] {
  const { address } = useWallet();

  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter((token) => isAddress(token.address)) ?? [],
    [tokens]
  );

  const tokensList: Address[] = validatedTokens.map((token) => token.address as Address);

  const balances = useMultipleContractSingleData({
    abi: erc20ABI,
    addresses: tokensList,
    functionName: "balanceOf",
    args: useMemo(() => [address as Address] as const, [address]),
    options: {
      enabled: Boolean(address && tokensList.length > 0),
    },
  });

  return useMemo(() => {
    if (account && validatedTokens.length > 0) {
      return validatedTokens.reduce<(TokenResult | undefined)[]>(
        (memo, token, i) => {
          const value = balances?.[i]?.result;
          const amount = value ? formatUnits(value, token.decimals) : "0";
          memo.push({...token, amount })
          return memo;
        },
        []
      );
    }
    return [];
  }, [account, validatedTokens, balances]);
}
