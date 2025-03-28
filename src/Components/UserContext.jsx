import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => 
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    user
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user");
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
