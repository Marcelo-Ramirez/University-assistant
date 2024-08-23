import Chat from '../components/Chat';
import { BotProvider } from '../context/BotContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot() {
    return (
        <div className=" grid grid-cols-12 grid-rows-12 col-span-12 row-span-8 bg-green-500">
            <BotProvider>
                <ChatBox />
                <InputBox />
            </BotProvider>
        </div>
    );
}

export default Bot;
