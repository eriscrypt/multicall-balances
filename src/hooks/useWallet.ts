import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  usePublicClient,
  useSwitchNetwork,
  useWalletClient,
} from "wagmi";

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const shortAddress = address
    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`.toLowerCase()
    : "";
  const { chain } = useNetwork();
  const { data: balance } = useBalance({ address });

  const publicClient = usePublicClient({
    chainId: chain?.id,
  });

  const { data: walletClient } = useWalletClient({
    chainId: chain?.id,
  });

  const { switchNetwork, chains } = useSwitchNetwork();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return {
    address,
    shortAddress,
    connectors,
    chain,
    chainId: chain ? chain.id : 0,
    chains,
    balance,
    isConnected,
    provider: publicClient,
    walletClient,
    connect,
    disconnect,
    switchNetwork,
  };
};
