import { createContext, useContext, useState } from "react";

const Context = createContext();

export const CallRecordContext = ({ children }) => {
    const [resData, setResData] = useState([]);
  return (
    <Context.Provider
      value={{
       resData,setResData
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCallRecordContext = () => useContext(Context);