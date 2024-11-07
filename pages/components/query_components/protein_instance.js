// import React, { useState, useContext } from "react";
// import TableView from "../viewTypes/tableview";
// import { DataContext } from '../context_provider/Datafetcher';

// const KEGG_Page = () => {
//   const [taxonID, setTaxonID] = useState("");
//   const [strainNumber, setStrainNumber] = useState("");
//   const [organismdata, setOrganismdata] = useState([]);
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const { data, loading } = useContext(DataContext);  

//   const handleSelectChange = async (event) => {
//     setIsButtonClicked(false);
//     const [selectedTaxonID, selectedStrainNumber] = event.target.value.split(',');
//     setTaxonID(selectedTaxonID);
//     setStrainNumber(selectedStrainNumber);

//     try {
//       const response = await fetch(`/api/querypage_calls/kegg_ortho_id?taxon_id=${selectedTaxonID}&strain_number=${selectedStrainNumber}`);
//       const data = await response.json();
//       console.log("gene name data:", data, data.data);
//       setOrganismdata(data.data);
//       setIsButtonClicked(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2> List all KEGG IDs of an organism </h2>
//       <h4> List of organisms </h4>
//       <select onChange={handleSelectChange}>  
//           <option value=''>Select an organism</option>
//           {data.map((item) => (
//             <option key={item.organism_ID} value={`${item.taxon_ID},${item.strain_number}`}>
//               {item.species} {item.strain} 
//             </option>
//           ))}
//       </select>
//       <br></br>

//       {isButtonClicked ? (
//         organismdata !== undefined ? (
//           organismdata.length > 0 ? (
//             <TableView data={organismdata} />
//           ) : (
//             <p>Data not available in our database</p>
//           )
//         ) : (
//           <p>Select a strain.</p>
//         )
//       ) : null}
//     </div>
//   );
// };

// export default KEGG_Page;

import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";
import { DataContext } from '../context_provider/Datafetcher';

const Protein_Instances = () => {
  const [taxonID, setTaxonID] = useState("");
  const [strainNumber, setStrainNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // New state for the second dropdown
  const [organismdata, setOrganismdata] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { data, loading } = useContext(DataContext);  

  const handleOrganismChange = (event) => {
    setIsButtonClicked(false);
    const [selectedTaxonID, selectedStrainNumber] = event.target.value.split(',');
    setTaxonID(selectedTaxonID);
    setStrainNumber(selectedStrainNumber);
    setSelectedOption(""); // Reset the selected option when a new organism is selected
  };

  const handleOptionChange = async (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);

    let apiUrl = '';
    if (selectedOption === 'KEGG') {
      apiUrl = `/api/querypage_calls/protein_instance_Calls/kegg_ortho_id?taxon_id=${taxonID}&strain_number=${strainNumber}`;
    } else if (selectedOption === 'COG') {
      apiUrl = `/api/querypage_calls/protein_instance_Calls/cog?taxon_id=${taxonID}&strain_number=${strainNumber}`;
    } else if (selectedOption === 'PFAM') {
      apiUrl = `/api/querypage_calls/protein_instance_Calls/pfam?taxon_id=${taxonID}&strain_number=${strainNumber}`;
    }

    if (apiUrl) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Data:", data, data.data);
        setOrganismdata(data.data);
        setIsButtonClicked(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2> Select organism and feature </h2>
      <h4> List of organisms </h4>
      <select onChange={handleOrganismChange}>  
          <option value=''>Select an organism</option>
          {data.map((item) => (
            <option key={item.organism_ID} value={`${item.taxon_ID},${item.strain_number}`}>
              {item.species} {item.strain} 
            </option>
          ))}
      </select>
      <br /><br />

      {taxonID && strainNumber && (
        <>
          <h4>Select Data Type:</h4>
          <select onChange={handleOptionChange}>
            <option value=''>Select an option</option>
            <option value='KEGG'>KEGG</option>
            <option value='COG'>COG</option>
            <option value='PFAM'>PFAM</option>
          </select>
          <br /><br />
        </>
      )}

      {isButtonClicked ? (
        organismdata !== undefined ? (
          organismdata.length > 0 ? (
            <>
            
            <h3>No of records found : {organismdata.length} </h3>
            <TableView data={organismdata} taxonID={taxonID} strainNumber={strainNumber}/>
            </>
          ) : (
            <p>Data not available. Probably an invalid gene ID was entered</p>
          )
        ) : (
          <p>Enter a valid gene ID.</p>
        )
      ) : null}
    </div>
  );
};

export default Protein_Instances;
