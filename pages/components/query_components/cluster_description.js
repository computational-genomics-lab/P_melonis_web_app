import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";

const Cluster_Description = () => { 
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [name, setName] = useState('');
    const [clusterData, setClusterData] = useState([]);

    const handleInputChange = (event) => {
        setIsButtonClicked(false);
        setName(event.target.value);
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`/api/querypage_calls/cluster_description?desc=${name}`);
          const data = await response.json();
          console.log("gene name data:", data, data.data);
          setClusterData(data.data);
          setIsButtonClicked(true); // Set the flag indicating that the button is clicked
    
        } catch (error) {
          console.error(error);
        }
      };

 return (
    <div>
      <h2> Search by Domain name: </h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={name} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
<br></br>
{isButtonClicked ? (
  clusterData !== undefined ? (
    clusterData.length > 0 ? (
      <TableView data={clusterData} />
    ) : (
      <p>Data not available. An invalid domain name was probably entered</p>
    )
  ) : (
    <p>Enter a valid domain name.</p>
  )
) : null}
    </div>
    )
    

}

export default Cluster_Description;