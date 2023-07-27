import './App.css';
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

function App() {
  return (
   <div>
    <p>Hello World!</p>
   </div>
  );
}

export default App;
