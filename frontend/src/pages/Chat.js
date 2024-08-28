import React from 'react';
import { ChatGlobalProvider } from '../context/ChatGlobalContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Chat() {
    return (
        // Para la responsividad estamos usando margenes izquierdo y derecho
        <div className="grid grid-cols-12 grid-rows-10 col-span-12 row-span-10 mx-0 md:mx-[5rem] lg:mx-[12rem]">
            <ChatGlobalProvider>
                <ChatBox className="row-span-10" />
                <InputBox className="" />
            </ChatGlobalProvider>
        </div>
    );
}

export default Chat;
