import Chat from '../components/Chat';
import { BotProvider } from '../context/BotContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot({className }) {
    return (
        <div className={`${className}  grid grid-rows-12 col-span-12 row-span-12`}>
        <BotProvider>
            <ChatBox className="row-span-11" />
            <InputBox className="row-span-1" />
        </BotProvider>
    </div>
);
}

export default Bot;
