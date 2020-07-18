import React, {useState, createContext} from 'react';

export const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [loginInfo, setLoginInfo] = useState("First");
    return (
        <LoginContext.Provider value={[loginInfo, setLoginInfo]}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;