import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';

function Bot({className}) {
    return (

        <div className="grid grid-cols-12 grid-rows-12 col-span-12 row-span-10">
            <ChatBox className="col-span-12 row-span-11" />
            <InputBox className="col-span-12 row-span-1" />

    </div>
);
}

export default Bot;
