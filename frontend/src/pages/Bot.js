//import Chat from '../components/Chat';
import { BotProvider } from '../context/BotContext';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot() {
    return (
        <BotProvider>
            {/* con las clases de md:mx-20 estamos realizando la responsividad */}
            <div className='grid grid-cols-12 grid-rows-12 col-span-12 lg:mx-[15rem] md:mx-20 sm:mx-5 row-span-8'>
                <ChatBox />
                <InputBox />
            </div>
        </BotProvider>
    );
}

export default Bot;
