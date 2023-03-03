import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.scss";

import App from "./App";
import { ChatContextProvider } from "./Context/ChatContext";
import { AuthContextProvider } from "./Context/authContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
