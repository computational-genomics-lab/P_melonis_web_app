import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sql_connection?table=organism');
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    // toggler, Define a function to handle click events on list items displayed by the useEffect hook
const handleClick = (event, id) => { 
  event.stopPropagation();
  if (expanded === id) {
    setExpanded(null); // Collapse the list item if it's already expanded
  } else {
    setExpanded(id);  // Expand the item if it's not already expanded
  }
};

  return (
    <DataContext.Provider value={{ data, loading, handleClick, expanded }}>
      {children}
    </DataContext.Provider>
  );
}