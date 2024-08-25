import { BotProvider } from '../context/BotContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot() {
    return (
        <div className="grid grid-cols-12 grid-rows-12 col-span-12 row-span-10">
            <BotProvider>
                <ChatBox className="col-span-12 row-span-11" />
                <InputBox className="col-span-12 row-span-1" />
            </BotProvider>
        </div>
    );
}

export default Bot;
