import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({
    auth: null,
    setAuth: () => {}
})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}

