import Chat from '../components/Chat';
import sendMessage from '../services/api.js'

function Bot() {
   

    return (
        <div className="App">
            <Chat sendMessage={sendMessage} />
        </div>
    );
}

export default Bot;
