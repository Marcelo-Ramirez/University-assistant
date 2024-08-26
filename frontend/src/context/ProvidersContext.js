import React from 'react';
import { BotProvider } from './BotContext';
import { DeviceProvider } from './DeviceContext';
import { InputFocusProvider } from './InputFocusContext';   

const ProvidersContext = ({ children }) => {
    return (
        <DeviceProvider>
            <BotProvider>
            <InputFocusProvider>
                {children}
                </InputFocusProvider>
            </BotProvider>
        </DeviceProvider>
    );
};

export default ProvidersContext;