import useSWR, { unstable_serialize, useSWRConfig } from 'swr'
import useSWRImmutable from 'swr/immutable'

import { useWallet } from '@/hooks/useWallet'
import { viemClients } from '@/utils/viem'

const REFRESH_BLOCK_INTERVAL = 4000
const FAST_INTERVAL = 5000
const SLOW_INTERVAL = 30000

export const usePollBlockNumber = () => {
  const { cache, mutate } = useSWRConfig()
  const { chainId } = useWallet()

  const { data } = useSWR(
    'blockNumberFetcher',
    async () => {
      const provider = viemClients[chainId as keyof typeof viemClients]
      const blockNumberBigInt = await provider.getBlockNumber()
      const blockNumber = Number(blockNumberBigInt)
      mutate(['blockNumber', chainId], blockNumber)
      if (!cache.get(unstable_serialize(['initialBlockNumber', chainId]))?.data) {
        mutate(['initialBlockNumber', chainId], blockNumber)
      }
      if (!cache.get(unstable_serialize(['initialBlockTimestamp', chainId]))?.data) {
        const block = await provider.getBlock({ blockNumber: blockNumberBigInt })
        mutate(['initialBlockTimestamp', chainId], Number(block.timestamp))
      }
      return blockNumber
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    }
  )

  useSWR(
    'blockNumber',
    async () => {
      return data
    },
    {
      refreshInterval: FAST_INTERVAL,
    }
  )

  useSWR(
    'blockNumber',
    async () => {
      return data
    },
    {
      refreshInterval: SLOW_INTERVAL,
    }
  )
}

export const useCurrentBlock = (): number => {
  const { chainId } = useWallet()
  const { data: currentBlock = 0 } = useSWRImmutable(['blockNumber', chainId])
  return Number(currentBlock)
}

export const useInitialBlock = (): number => {
  const { chainId } = useWallet()
  const { data: initialBlock = 0 } = useSWRImmutable(['initialBlockNumber', chainId])
  return Number(initialBlock)
}

export const useInitialBlockTimestamp = (): number => {
  const { chainId } = useWallet()
  const { data: initialBlockTimestamp = 0 } = useSWRImmutable(['initialBlockTimestamp', chainId])
  return Number(initialBlockTimestamp)
}
