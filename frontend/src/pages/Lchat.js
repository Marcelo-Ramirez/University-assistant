import '../styles/App.css';
import SlidingChat from '../components/SlidingChat.js';
import Chat from '../components/Chat.js';
import sendMessage from '../services/api.js'

function Lchat() {
    
  
    return (
      <div className="App">
         {/* El componente SlidingChat puede tener su propia lógica para el chat global */}
         <SlidingChat sendMessage={sendMessage}  />
        
        {/* Pasa sendMessage al componente Chat */}
        <Chat sendMessage={sendMessage} isMenuOpen={true} />
      </div>
    );
  }
  
  export default Lchat;