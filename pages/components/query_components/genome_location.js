import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";
import VizButton from "../visualization/viz_button";
import { DataContext } from '../context_provider/Datafetcher';

const Genome_location = () => {

    const [location, setLocation] = useState("");    
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const [taxonID, setTaxonID] = useState("");
    const [strainNumber, setStrainNumber] = useState("");
    const [organismdata, setOrganismdata] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const { data} = useContext(DataContext);  

    const handleInputChange = (event) => {
        setIsButtonClicked(false);
        setLocation(event.target.value);
      };

      const handleOrganismChange = (event) => {
        setIsButtonClicked(false);
        const [selectedTaxonID, selectedStrainNumber, species, strain] = event.target.value.split(',');
        const speciesWords = species.split(' ');
        //there is a blank space before the strings stored in the species and strain variables respectively
        const speciesAbbreviation = speciesWords[1].substring(0, 3) + speciesWords[2].substring(0, 3) + '_' + strain.replace(/\s+/g, '');
        setName(speciesAbbreviation);
        setTaxonID(selectedTaxonID);
        setStrainNumber(selectedStrainNumber);
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
          const [scaffold, range] = location.split(":");
          const [start, end] = range.split("-");
          
          const response = await fetch(`/api/querypage_calls/genome_location?scaffold=${scaffold}&taxon_ID=${taxonID}&strain_number=${strainNumber}&start=${start}&end=${end}`);
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
          <h2> Search by genome location: </h2>
          <h4> List of organisms </h4>
         <p>
        <select onChange={handleOrganismChange}>
          <option value=''>Select an organism</option>
        {(data || []).map(item => (
	      <option key={item.id} value={`${item.taxon_ID},${item.strain_number}, ${item.species}, ${item.strain}`}>
              {item.species} {item.strain}
            </option>
          ))}
        </select></p>
                     
      Enter genome location : <form onSubmit={handleFormSubmit}>
            <input type="text" value={location} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>
 {isLoading && <p>Loading...</p>} 
          {isButtonClicked ? (
  organismdata !== undefined ? (
    organismdata.length > 0 ? (
      <>
      <br></br>
      <VizButton name={name} location={location}/>
      <TableView data={organismdata} taxonID={taxonID} strainNumber={strainNumber} />
	{console.log(organismdata, typeof(organismdata))} 
     </>
    ) : (
      <p>No data found </p>
    )
  ) : (
    <p>Please choose the organism and enter in the correct input format </p>
   
  )
) : null}

<p>Input Format: Scaffold_name:location_start-location_end. e.g: Scaffold_2:4000-50000
</p>
</div>
          )
  
}

export default Genome_location;
