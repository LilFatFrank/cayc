import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "./context/Context";
import Modal from "./modal/Modal";
import "./style/app.scss";
import CONFIG from "./config/config.json";
import { isMobileOnly } from "react-device-detect";

function App() {
  const {
    active,
    connect,
    account,
    showWrongNetworkModal,
    setShowWrongNetworkModal,
    smartContract,
    contractDetails,
    addingContractDetails,
    baycHolder,
  } = useContext(AppContext);

  const [mintCount, setMintCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const renderApes = () => {
    const apes = [];
    for (let i = 1; i < 6; i++) {
      apes.push(
        <img
          src={`assets/apes.gif`}
          alt={`Ape-${i}`}
          key={i}
          width={200}
          height={200}
        />
      );
    }
    return apes;
  };

  const mint = async () => {
    setLoading(true);
    setSuccess(false);
    setFailed(false);
    smartContract.methods
      .mint(mintCount)
      .send({
        from: account,
        to: CONFIG.CONTRACT_ADDRESS,
        gasLimit: CONFIG.GAS_LIMIT,
        ...(baycHolder ? { value: 0.1 * mintCount } : undefined),
      })
      .then((data) => {
        setLoading(false);
        if (data && data.blockHash) {
          setSuccess(true);
          addingContractDetails();
        }
      })
      .catch((error) => {
        setFailed(true);
        setLoading(false);
      });
  };

  const onButtonClick = () => {
    if (active) {
      mint();
    } else {
      connect();
    }
  };

  return isMobileOnly ? (
    <div id="app" style={{ padding: "20px" }}>
      <img src="assets/apes.gif" alt="apes" width={200} height={200} />
      <h3 style={{ color: "var(--yellow)" }}>
        can't get Caked on mobile,
        <br /> fam, use the desktop.
      </h3>
    </div>
  ) : (
    <>
      <div id="app">
        <div className="wrapper">
          <div className="top">
            <div className="top-left">
              <h1>
                Welcome to The
                <br />
                Caked Ape Yacht Club
              </h1>
              <img src="assets/ape-icon.png" alt="ape-icon" />
            </div>
            <h3>
              “If Monalisa can get caked in the real world,
              <br /> so can your Jpegs in the Metaverse”
            </h3>
          </div>
          <div className="middle-1">
            <div className="border-top" />
            <div className="border-bottom" />
            <div className="apes">{renderApes()}</div>
          </div>
          <div className="middle-2">
            <div className="middle-2-left">
              <h2>Fairest distribution of all time</h2>
              <img
                src="assets/justice.png"
                alt="justice"
                width={60}
                height={60}
              />
            </div>
          </div>
          <div className="end">
            <div className="details">
              <img
                src="assets/supply.png"
                alt="supply"
                width={200}
                height={200}
              />
              <img
                src="assets/public.png"
                alt="public"
                width={200}
                height={200}
              />
              <img src="assets/bayc.png" alt="bayc" width={200} height={200} />
            </div>
            <div className="mint-area">
              {active ? (
                <>
                  <div className="label">
                    {contractDetails?.totalSupply}/5000
                  </div>
                  <div className="count">
                    <img
                      src="assets/up.png"
                      alt="up"
                      onClick={() =>
                        setMintCount(mintCount >= 10 ? 10 : mintCount + 1)
                      }
                    />
                    <div className="num">{mintCount}</div>
                    <img
                      src="assets/down.png"
                      alt="down"
                      onClick={() =>
                        setMintCount(mintCount <= 1 ? 1 : mintCount - 1)
                      }
                    />
                  </div>
                </>
              ) : null}
              <button className="button" onClick={onButtonClick}>
                {active ? "Mint" : "Connect Wallet"}
              </button>
              {active ? (
                <>
                  <div
                    className={`label ${
                      success ? "green" : failed ? "red" : ""
                    }`}
                  >
                    {loading
                      ? "Caking your Ape..."
                      : success
                      ? "Successfully caked."
                      : failed
                      ? "Something went wrong with the caking."
                      : "Mint your Caked Ape."}
                  </div>
                  <div className="border" />
                  <div className="banana-label">
                    <img
                      src="assets/banana.png"
                      alt="banana"
                      width={24}
                      height={24}
                    />
                    <div className="label">max 10 per wallet</div>
                    <img
                      src="assets/banana.png"
                      alt="banana"
                      width={24}
                      height={24}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showWrongNetworkModal}
        handleClose={() => setShowWrongNetworkModal(false)}
      >
        <Typography>Please use the Ethereum Main Network</Typography>
      </Modal>
    </>
  );
}

export default App;
