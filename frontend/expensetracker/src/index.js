import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { GlobalProvider } from "./context/globalContext";
import { GlobalStyle } from "./styles/GlobalStyles";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Provider>
  </React.StrictMode>
);
