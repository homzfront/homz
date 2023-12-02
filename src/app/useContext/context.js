// ProfileContext.js
"use client"
import React, { createContext, useState } from "react";

const ProfileContext = createContext({
  user: {},
  setUser: () => {},
});

const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
