import Chat from '../components/Chat';
import { BotProvider } from '../context/BotContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot({className }) {
    return (
        <div className={`${className} col-span-12 row-span-8 h-full grid grid-rows-12 bg-red-500`}>
        <BotProvider>
            <ChatBox className="row-span-11" />
            <InputBox className="row-span-1 " />
        </BotProvider>
    </div>
);
}

export default Bot;
