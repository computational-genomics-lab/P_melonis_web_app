
import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";
import { DataContext } from '../context_provider/Datafetcher';

const KEGG_Page = () => {

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const [taxonID, setTaxonID] = useState("");
    const [strainNumber, setStrainNumber] = useState("");
    const [organismdata, setOrganismdata] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const { data} = useContext(DataContext);  

    const handleInputChange = (event) => {
        setIsButtonClicked(false);
        setName(event.target.value);
      };

      const handleOrganismChange = (event) => {
        setIsButtonClicked(false);
        const [selectedTaxonID, selectedStrainNumber] = event.target.value.split(',');

        setTaxonID(selectedTaxonID);
        setStrainNumber(selectedStrainNumber);
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
          
          
          const response = await fetch(`/api/querypage_calls/protein_instance_Calls/kegg_id?name=${name}&taxon_id=${taxonID}&strain_number=${strainNumber}`);
          const data = await response.json();
          setOrganismdata(data.data);
          setIsButtonClicked(true); // Set the flag indicating that the button is clicked
    
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
    
      return (
        <div>
          <h2> Search by KEGG ortho id: </h2>
          <h4> List of organisms </h4>
         <p>
        <select onChange={handleOrganismChange}>
          <option value=''>Select an organism</option>
          {data.map((item) => (
            <option key={item.id} value={`${item.taxon_ID},${item.strain_number}`}>
              {item.species} {item.strain}
            </option>
          ))}
        </select></p>

      Enter KEGG id: <form onSubmit={handleFormSubmit}>
            <input type="text" onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>
 {isLoading && <p>Loading...</p>} 
          {isButtonClicked ? (
  organismdata !== undefined ? (
    organismdata.length > 0 ? (
      <>
      <br></br>
      <TableView data={organismdata} />
     </>
    ) : (
      <p>No data found </p>
    )
  ) : (
    <p>Please choose the organism and enter a valid primary annotation </p>
   
  )
) : null}

<p>
Upon entering a KOG ID, the database is searched and if more than one gene maps to the same KOG ID, 
the output page shows the list of genes in a table format. There may be instances where the output
 page contains same gene mapped to same KOG ID and the list appears redundant. This happens when the
  same KOG ID is part of multiple metabolic pathways. e.g; Upon searching for K08269 in 
  Albugo laibachiiNC14 (V1), two records appear identical. This is because the KO ID 
  linked to two different pathways e.g; one connects tomTOR signalling pathway with pathway id 
  ko04150 and the other connects to regulation of autophagy pathway (pathway id ko04140). 
  
        </p>
      
      
</div>
          )
};

export default KEGG_Page;
