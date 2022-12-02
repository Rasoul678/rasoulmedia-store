import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { StoreProvider } from "state/store";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rasoulmedia Store Provider</h1>
        <div>
          Visit:{" 👉 "}
          <a
            className="App-link"
            href="https://www.rasoulmedia.com"
            rel="noreferrer"
            target="_blank"
          >
            rasoulmedia.com
          </a>
        </div>
      </header>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
