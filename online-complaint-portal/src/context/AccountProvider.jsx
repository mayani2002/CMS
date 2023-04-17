
// import { io } from 'socket.io-client';
import React, { createContext, useEffect, useRef, useState } from "react";


export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {

    const [account, setAccount] = useState({ "id": "", "email": "", "firstName": "" });
    const [newNotificationFlag, setNotificationFlag] = useState(false);


    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            // socket,
            newNotificationFlag,
            setNotificationFlag
        }}
        >{children}
        </AccountContext.Provider>
    )
}
export default AccountProvider;