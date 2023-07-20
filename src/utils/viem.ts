import { createPublicClient, fallback, http, PublicClient } from 'viem'

import { SupportedChainId as ChainId, WAGMI_CHAINS } from '@/common/chains'
import { PUBLIC_NODES } from '@/common/nodes'

export const viemClients = WAGMI_CHAINS.reduce((prev, cur) => {
  return {
    ...prev,
    [cur.id]: createPublicClient({
      chain: cur,
      transport: fallback(
        (PUBLIC_NODES[cur.id] as unknown as string[]).map((url) =>
          http(url, {
            timeout: 15_000,
          })
        ),
        {
          rank: false,
        }
      ),
      batch: {
        multicall: {
          batchSize: 1024 * 200,
        },
      },
    }),
  }
}, {} as Record<ChainId, PublicClient>)

export const getViemClients = ({ chainId }: { chainId: ChainId }) => {
  return viemClients[chainId]
}
