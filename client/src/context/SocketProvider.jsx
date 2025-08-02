import { createContext, useEffect } from "react";
import socket from "@/utils/socket";
import { connectSocketWithAuth } from "@/utils/socket";


export const SocketContext = createContext();

const SocketProvider = ({children}) => {

    useEffect(() => {
    connectSocketWithAuth();

    return () => {
      socket.disconnect();
    };
  }, []);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;