import React, { createContext, ReactNode, useContext, useState } from "react";

//------- types ------- //
type TUser = {
  first_name: string;
  last_name: string;
  email: string;
};

type TAuthContext = {
  user: TUser | null;
  token: string | null;
  setUser: (user: TUser | null) => void;
  setToken: (token: string | null) => void;
  setLogout: () => void;
};

interface IAuthContextProvider {
  children: ReactNode;
}
//------- types ------- //

const AuthContext = createContext<TAuthContext>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  setLogout: () => {},
});

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [token, _setToken] = useState<string | null>(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setLogout = () => {
    setUser(null);
    _setToken(null);
    localStorage.removeItem("ACCESS_TOKEN");
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
