// selected values from the autocheck tree that is defined by checkbox_tree.js
//Global state management

import { createContext, useState } from 'react';

// Create the context
export const SelectedValuesContext = createContext();

// Create the provider component
export const SelectedValuesProvider = ({ children }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedOrganisms, setSelectedOrganisms] = useState([]);

  return (
    <SelectedValuesContext.Provider value={{ selectedValues, setSelectedValues, selectedOrganisms, setSelectedOrganisms } }>
      {children}
    </SelectedValuesContext.Provider>
  );
};
