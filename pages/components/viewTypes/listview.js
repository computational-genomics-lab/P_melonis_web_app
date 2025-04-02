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


const handleDownload = async (species, strain) => {
  const speciesWords = species.split(' ');
  const speciesAbbreviation = speciesWords.length > 1
    ? speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 3)
    : species.substring(0, 6);

  const baseNameWithStrain = `${speciesAbbreviation}_${strain.replace(/\s+/g, '')}`;
  const baseNameWithoutStrain = speciesAbbreviation;

  setBasename(baseNameWithStrain); // Initially set with strain

  try {
    // Attempt download with basename including strain
    const responseWithStrain = await fetch(`/api/download?basename=${baseNameWithStrain}`);

    if (responseWithStrain.ok) {
      // Trigger the actual download (you might need to adjust this based on your UI framework)
      window.location.href = `/api/download?basename=${baseNameWithStrain}`;
      return; // Download successful, exit the function
    } else if (responseWithStrain.status === 404) {
      // If no file found with strain, try downloading with species abbreviation only
      setBasename(baseNameWithoutStrain);
      const responseWithoutStrain = await fetch(`/api/download?basename=${baseNameWithoutStrain}`);

      if (responseWithoutStrain.ok) {
        // Trigger download with species abbreviation
        window.location.href = `/api/download?basename=${baseNameWithoutStrain}`;
        return; // Download successful, exit the function
      } else {
        // Handle the case where download fails even with species abbreviation
        console.error('Download failed for both basename with strain and species abbreviation');
        // Optionally display an error message to the user
      }
    } else {
      // Handle other potential errors during the first download attempt
      console.error('Error during download attempt with strain:', responseWithStrain.status);
      // Optionally display an error message
    }
  } catch (error) {
    console.error('Error during download attempt:', error);
    // Optionally display a generic error message
  }
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
