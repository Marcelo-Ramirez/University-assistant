import React from "react";
import { BotProvider } from "./BotContext";
import { DeviceProvider } from "./DeviceContext";
import { InputFocusProvider } from "./InputFocusContext";
import { ChatGlobalProvider } from '../context/ChatGlobalContext';

const ProvidersContext = ({ children }) => {
  return (
    <DeviceProvider>
      <ChatGlobalProvider>
        <BotProvider>
          <InputFocusProvider>
          {children}
          </InputFocusProvider>
        </BotProvider>
      </ChatGlobalProvider>
    </DeviceProvider>
  );
};

export default ProvidersContext;
