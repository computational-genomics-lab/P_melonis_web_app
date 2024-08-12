import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";
import { DataContext } from '../context_provider/Datafetcher';

const KEGG_Page = () => {
  const [taxonID, setTaxonID] = useState("");
  const [strainNumber, setStrainNumber] = useState("");
  const [organismdata, setOrganismdata] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { data, loading } = useContext(DataContext);  

  const handleSelectChange = async (event) => {
    setIsButtonClicked(false);
    const [selectedTaxonID, selectedStrainNumber] = event.target.value.split(',');
    setTaxonID(selectedTaxonID);
    setStrainNumber(selectedStrainNumber);

    try {
      const response = await fetch(`/api/querypage_calls/kegg_ortho_id?taxon_id=${selectedTaxonID}&strain_number=${selectedStrainNumber}`);
      const data = await response.json();
      console.log("gene name data:", data, data.data);
      setOrganismdata(data.data);
      setIsButtonClicked(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2> List all KEGG IDs of an organism </h2>
      <h4> List of organisms </h4>
      <select onChange={handleSelectChange}>  
          <option value=''>Select an organism</option>
          {data.map((item) => (
            <option key={item.organism_ID} value={`${item.taxon_ID},${item.strain_number}`}>
              {item.species} {item.strain} 
            </option>
          ))}
      </select>
      <br></br>

      {isButtonClicked ? (
        organismdata !== undefined ? (
          organismdata.length > 0 ? (
            <TableView data={organismdata} />
          ) : (
            <p>Data not available in our database</p>
          )
        ) : (
          <p>Select a strain.</p>
        )
      ) : null}
    </div>
  );
};

export default KEGG_Page;
