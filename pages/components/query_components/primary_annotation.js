import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";
import { DataContext } from "../context_provider/Datafetcher";
import Cluster_Description from "./cluster_description";

const Primary = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [taxonID, setTaxonID] = useState("");
  const [strainNumber, setStrainNumber] = useState("");
  const [organismData, setOrganismData] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { data } = useContext(DataContext);

  const handleInputChange = (event) => {
    setIsButtonClicked(false);
    setName(event.target.value);
  };

  const handleOrganismChange = (event) => {
    setIsButtonClicked(false);
    const [selectedTaxonID, selectedStrainNumber] = event.target.value.split(",");
    setTaxonID(selectedTaxonID);
    setStrainNumber(selectedStrainNumber);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/querypage_calls/primary_annotation?name=${name}&taxon_ID=${taxonID}&strain_number=${strainNumber}`
      );
      const result = await response.json();
      setOrganismData(result.data || []);
      setIsButtonClicked(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Search by Primary Annotation:</h2>
      <h4>List of organisms</h4>
      <p>
        <select onChange={handleOrganismChange}>
          <option value="">Select an organism</option>
          {Array.isArray(data) &&
            data.map((item) => (
              <option
                key={`${item.taxon_ID}-${item.strain_number}`}
                value={`${item.taxon_ID},${item.strain_number}`}
              >
                {item.species} {item.strain}
              </option>
            ))}
        </select>
      </p>

      <form onSubmit={handleFormSubmit}>
        Enter primary annotation name:{" "}
        <input type="text" onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>

      {isLoading && <p>Loading...</p>}

      {isButtonClicked &&
        (organismData ? (
          organismData.length > 0 ? (
            <>
              <br />
              <TableView
                data={organismData}
                taxonID={taxonID}
                strainNumber={strainNumber}
              />
            </>
          ) : (
            <p>No data found</p>
          )
        ) : (
          <p>Please choose the organism and enter a valid primary annotation</p>
        ))}

<p>
      Primary annotations in galEupy are taken directly from the EggNOG-mapper functional annotation file provided during data upload.
      For each predicted protein, galEupy extracts the descriptive annotation assigned by EggNOG-mapper. This descriptor is treated as the “primary annotation” shown in the web interface.

 <br />
        <strong>Example:</strong> Searching for <em>"actin"</em>
        returns any proteins for which EggNOG-mapper supplied an annotation containing that keyword.
      </p>

      <Cluster_Description />
    </div>
  );
};

export default Primary;
