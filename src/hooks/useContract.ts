import { Contract } from "ethers";
import { useMemo } from "react";
import { Address, erc20ABI, useWalletClient } from "wagmi";

import { MULTICALL } from "@/common/constants";
import { getContract } from "@/utils";

import { useWallet } from "./useWallet";

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: Address | { [chainId: number]: Address } | undefined,
  ABI: any
): T | null {
  const { chainId } = useWallet();
  const { data: walletClient } = useWalletClient();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !walletClient || !chainId) return null;
    let address: Address | undefined;

    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];

    if (!address) return null;

    try {
      return getContract({
        abi: ABI,
        address,
        chainId,
        signer: walletClient,
      });
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [addressOrAddressMap, ABI, walletClient, chainId]) as T | null;
}

export function useMulticallContract() {
  return useContract(MULTICALL.address, MULTICALL.abi);
}

export function useTokenContract(tokenAddress?: Address) {
  return useContract(tokenAddress, erc20ABI);
}
