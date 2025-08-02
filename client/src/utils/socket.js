import io from 'socket.io-client'

const baseURL = "https://echo-wave.vercel.app/";
const localUrl = 'http://localhost:5000';


const token = localStorage.getItem('token');
const socket = io(baseURL, {
    auth: {
        token: `Bearer ${token}`
    }
});


export const connectSocketWithAuth = () => {
  const token = localStorage.getItem("token");
  socket.auth = {
    token: `Bearer ${token}`
  };
  socket.connect();
};


export default socket;
