import React, { useState, useEffect, useContext } from "react";
import TableView from "../viewTypes/tableview";
import { DataContext } from '../context_provider/Datafetcher';

const Genome_location = () => {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const [selectedOrganism, setSelectedOrganism] = useState("");
    const [organismdata, setOrganismdata] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const { data} = useContext(DataContext);  

    const handleInputChange = (event) => {
        setIsButtonClicked(false);
        setName(event.target.value);
      };

      const handleOrganismChange = (event) => {
        setIsButtonClicked(false);
        setSelectedOrganism(event.target.value);
      };
      const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
          const response = await fetch(`/api/querypage_calls/genome_location?location=${name}&id=${selectedOrganism}`);
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
        <select value={selectedOrganism} onChange={handleOrganismChange}>
          <option value=''>Select an organism</option>
          {data.map((item) => (
            <option key={item.id} value={item.taxon_id}>
              {item.species} {item.strain}
            </option>
          ))}
        </select></p>
                     
        Enter genome location : <form onSubmit={handleFormSubmit}>
            <input type="text" value={name} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>
{isLoading && <p>Loading...</p>} 
          {isButtonClicked ? (
  organismdata !== undefined ? (
    organismdata.length > 0 ? (
      <TableView data={organismdata} />
    ) : (
      <p>No data found </p>
    )
  ) : (
    <p>Out of range of scaffold.</p>
  )
) : null}

<p>Input Format: Scaffold_name:location_start-location_end. e.g: Scaffold_2:4000-50000
</p>
</div>
          )
  
}

export default Genome_location;