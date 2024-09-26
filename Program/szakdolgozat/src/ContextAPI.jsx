import React, { createContext, useState, useContext } from 'react';
import supplementsData from './datas/supplements.json';
import machinesData from './datas/machines.json';
import additionalData from './datas/additionals.json';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [supplements, setSupplements] = useState(supplementsData.supplements);
  const [machines, setMachines] = useState(machinesData.machines);
  const [additionals, setAdditionals] = useState(additionalData.additionals);
  const [cartItems, setCartItems] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <DataContext.Provider value={{ supplements, setSupplements, machines, setMachines, additionals, setAdditionals, cartItems, setCartItems, loggedIn, setLoggedIn, userName, setUserName }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
