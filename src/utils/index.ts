import { Abi, Address, getContract as viemGetContract, PublicClient, WalletClient } from 'viem'

export const getContract = <TAbi extends Abi | unknown[], TWalletClient extends WalletClient>({
  abi,
  address,
  publicClient,
  signer,
}: {
  abi: TAbi
  address: Address
  chainId?: number
  signer?: TWalletClient
  publicClient?: PublicClient
}) => {
  const c = viemGetContract({
    abi,
    address,
    publicClient,
    walletClient: signer,
  })
  return {
    ...c,
    account: signer?.account?.address,
    chain: signer?.chain?.id,
  }
}