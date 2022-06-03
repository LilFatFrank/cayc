import "./style/app.scss";

function App() {
  const renderApes = () => {
    const apes = [];
    for (let i = 1; i < 6; i++) {
      apes.push(
        <img
          src={`assets/Ape-${i}.png`}
          alt={`Ape-${i}`}
          key={i}
          width={200}
          height={200}
        />
      );
    }
    return apes;
  };

  return (
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
            <button className="button">Connect Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
