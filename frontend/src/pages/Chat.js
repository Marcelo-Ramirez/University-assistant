import React from 'react';
import { ChatGlobalProvider } from '../context/ChatGlobalContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot() {
    return (
        <div className=" grid grid-cols-12 grid-rows-12 col-span-12 row-span-8 bg-green-500">
            <ChatGlobalProvider>
                <ChatBox />
                <InputBox />
            </ChatGlobalProvider>
        </div>
    );
}

export default Bot;
