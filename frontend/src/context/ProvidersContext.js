import React from "react";
import { BotProvider } from "./BotContext";
import { DeviceProvider } from "./DeviceContext";
import { InputFocusProvider } from "./InputFocusContext";
import { ChatGlobalProvider } from '../context/ChatGlobalContext';
import { ModalProvider } from '../context/ModalContext';

const ProvidersContext = ({ children }) => {
  return (
    <ModalProvider>
    <DeviceProvider>
      <ChatGlobalProvider>
        <BotProvider>
          <InputFocusProvider>
          {children}
          </InputFocusProvider>
        </BotProvider>
      </ChatGlobalProvider>
    </DeviceProvider>
    </ModalProvider>
  );
};

export default ProvidersContext;