import "./App.css";
import { MetaMaskProvider } from "./hooks/useMetaMask";
import { history } from "./utils/history";
import { Router } from "react-router-dom";
import { Root } from "./Root";
import { EtherProvider } from "./hooks/useProvider";

function App() {
  return (
    <MetaMaskProvider>
      <EtherProvider>
        <Router history={history}>
          <Root />
        </Router>
      </EtherProvider>
    </MetaMaskProvider>
  );
}

export default App;
