import { useState, useContext } from 'react';
import { DataContext } from '../context_provider/Datafetcher';

const OrganismList = () => {
  const { data, loading } = useContext(DataContext);
  const [baseName, setBasename] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  // const handleDownload = (species, strain) => {
  //   const speciesWords = species.split(' ');
  //   const speciesAbbreviation = speciesWords.length > 1 
  //     ? speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 3) 
  //     : species.substring(0, 6);
  //   const baseName = `${speciesAbbreviation}_${strain.replace(/\s+/g, '')}`;
  
  //   setBasename(baseName);
  
  //   const downloadLink = `/api/download?basename=${baseName}`;
  //   window.location.href = downloadLink;
  // };

 const handleDownload = (species, strain) => {
     const speciesWords = species.split(' ');
     const speciesAbbreviation = speciesWords.length > 1 
       ? speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 3) 
       : species.substring(0, 6);
     const baseName = `${speciesAbbreviation}_${strain.replace(/\s+/g, '')}`;
     setBasename(baseName);
   
     // Generate download link
     const downloadLink = `/api/download?basename=${baseName}`;
     
     // Use an anchor element to initiate the download
     const link = document.createElement('a');
     link.href = downloadLink;
     link.download = `${baseName}.zip`;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   };


  return (
    <div>
      <div className='leftcolumn'>
        <h5>Click on a strain to download all related data in zip format!</h5>
        <ul>
          {data.map((item) => (
            <li 
              key={item.taxon_ID} 
              onClick={() => handleDownload(item.species, item.strain)}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              <i>{item.species}</i> strain {item.strain}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrganismList;
