import Chat from '../components/Chat';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot({className }) {
    return (
        <div className={`${className}  grid grid-rows-12 col-span-12 row-span-12`}>
            <ChatBox className="row-span-11" />
            <InputBox className="row-span-1" />
    </div>
);
}

export default Bot;
