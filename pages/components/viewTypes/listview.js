import { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context_provider/Datafetcher';

const OrganismList = () => {
  const { data, loading, handleClick, expanded } = useContext(DataContext);
  const [baseName, setBasename] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDownload = (species, strain) => {
    const speciesWords = species.split(' ');
    const speciesAbbreviation = speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 3);
    const baseName = `${speciesAbbreviation}_${strain.replace(/\s+/g, '')}`;
  
    setBasename(baseName);
  
    // Trigger download by calling the API route
    const downloadLink = `/api/download?basename=${baseName}`;
    window.location.href = downloadLink;
  };
  

  return (
    <div>
      <div className='leftcolumn'>
        <h5>Click on a strain to download all the related data in zip format !</h5>
        <ul>
 
                  {data.map((item) => (
            <li 
              key={item.taxon_ID} 
              onClick={() => handleDownload(item.species, item.strain)} // Make the list item clickable
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} // Add some basic styling to indicate clickable items
            >
             <i>{item.species} </i> {item.strain}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default OrganismList;