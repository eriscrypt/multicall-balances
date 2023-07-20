import { polygon } from 'wagmi/chains'

import { SupportedChainId } from './chains'

export const PUBLIC_NODES = {
  [SupportedChainId.POLYGON]: polygon.rpcUrls.public.http,
} satisfies Record<SupportedChainId, readonly string[]>
