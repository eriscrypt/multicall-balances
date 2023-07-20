import { Address } from 'viem'
import { SupportedChainId } from './chains'
import MULTICALL_ABI from './abis/Multicall.json'

type AddressMap = { [chainId: number]: Address }

export const MULTICALL_ADDRESS: AddressMap = {
  // polygon
  [SupportedChainId.POLYGON]: '0xcA11bde05977b3631167028862bE2a173976CA11' as Address,
}

export const MULTICALL = {
  abi: MULTICALL_ABI,
  address: MULTICALL_ADDRESS,
}