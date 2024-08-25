import React from 'react';
import { ChatGlobalProvider } from '../context/ChatGlobalContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Chat() {
    return (
        <div className="grid grid-cols-12 grid-rows-12 col-span-12 row-span-10">
            <ChatGlobalProvider>
                <ChatBox className="col-span-12 row-span-11" />
                <InputBox className="col-span-12 row-span-1" />
            </ChatGlobalProvider>
        </div>
    );
}

export default Chat;
