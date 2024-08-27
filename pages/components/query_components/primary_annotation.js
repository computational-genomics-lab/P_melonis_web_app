import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";
import { DataContext } from '../context_provider/Datafetcher';

const Primary = () => {

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
          
          
          const response = await fetch(`/api/querypage_calls/primary_annotation?name=${name}&taxon_ID=${taxonID}&strain_number=${strainNumber}`);
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
          <h2> Search by Primary Annotation: </h2>
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

      Enter primary annotation name: <form onSubmit={handleFormSubmit}>
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
        primary annotations are derived from the blast hits of the protein sequences with nr database having greater than 50% identity over 50% of the query length. If the first hit matches with a un-named protein product, then the annotation of the subsequent qualified hit is assigned as the primary annotation for the query sequence.
        Input Example: Transcript keyword: actin
        </p>
      
</div>
          )
  
}

export default Primary;