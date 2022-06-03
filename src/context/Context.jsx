import { useWeb3React } from "@web3-react/core";
import { createContext, useEffect, useState } from "react";
import { injectors } from "../wallet/connectors";
import ABI from "../config/abi.json";
import CONFIG from "../config/config.json";
import BAYC_ABI from "../config/abi.json";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { active, account, activate, library } = useWeb3React();

  const [showWrongNetworkModal, setShowWrongNetworkModal] = useState(false);
  const [smartContract, setSmartContract] = useState(null);
  const [baycContract, setBaycContract] = useState(null);
  const [contractDetails, setContractDetails] = useState(null);
  const [baycHolder, setBaycHolder] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.chainId !== "0x1") setShowWrongNetworkModal(true);
      window.ethereum.on("networkChanged", (chain) => {
        setShowWrongNetworkModal(chain !== "1");
      });
      window.ethereum.on("accountsChanged", (acc) => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    if (active) {
      setContract();
    }
  }, [active]);

  useEffect(() => {
    if (smartContract) addingContractDetails();
  }, [smartContract]);

  useEffect(() => {
    if (baycContract) isBaycHolder();
  }, [baycContract]);

  const isBaycHolder = async () => {
    const nftCount = await baycContract.methods.balanceOf(account).call();
    setBaycHolder(parseInt(nftCount) > 0);
  };

  const setContract = async () => {
    const bayc = await new library.eth.Contract(BAYC_ABI, CONFIG.BAYC_CONTRACT);
    setBaycContract(bayc);
    const contract = await new library.eth.Contract(
      ABI,
      CONFIG.CONTRACT_ADDRESS
    );
    setSmartContract(contract);
  };

  const addingContractDetails = async () => {
    const totalSupply = await smartContract.methods.totalSupply().call();
    setContractDetails({
      ...contractDetails,
      totalSupply,
    });
  };

  async function connect() {
    try {
      if (window.ethereum.chainId !== "0x1") {
        setShowWrongNetworkModal(true);
      } else await activate(injectors);
    } catch (error) {
      console.log(error);
    }
  }

  const providerValue = {
    active,
    account,
    connect,
    showWrongNetworkModal,
    setShowWrongNetworkModal,
    smartContract,
    contractDetails,
    web3: library,
    addingContractDetails,
    baycHolder
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
