import SlidingChat from '../components/SlidingChat.js';
import Chat from '../components/Chat.js';
import sendMessage from '../services/api.js'

function Lchat() {
 
  
    return (
      <div className="App">
        {/* El componente SlidingChat ahora se renderiza como página completa, sin necesidad de `isOpen` y `onClose` */}
        <Chat sendMessage={sendMessage}   isMenuOpen={true}/>
        <SlidingChat sendMessage={sendMessage} />
        {/* El RegisterModal sigue funcionando como un modal */}
      </div>
    );
  }
  
  export default Lchat;