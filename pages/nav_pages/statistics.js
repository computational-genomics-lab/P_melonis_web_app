import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "../components/context_provider/Datafetcher";
import TableView from "../components/viewTypes/tableview";

const Statistics = () => {
  const { data } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false); 
  //is loading state is only changed by the Gene_details function because it will take more time to 
  //fetch the gene details than the scaffold details obviously
  const [selectedOrganism, setSelectedOrganism] = useState("");
  const [geneData, setGenedata] = useState([]);
  const [scaffoldData, setScaffolDdata] = useState([]);

  const [showTable, setShowTable] = useState(false);

  const Gene_details = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/statistics_calls/gene_details?id=${selectedOrganism}`
      );
      const data = await response.json();
      setGenedata(data.data);
      setShowTable(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Scaffold_details = async () => {
    try {
      const response = await fetch(
        `/api/statistics_calls/scaffold_details?id=${selectedOrganism}`
      );
      const data = await response.json();
      setScaffolDdata(data.data);
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    // Call the Gene_details function here to trigger the API call when the component mounts.
    if (selectedOrganism) {
      Gene_details();
      Scaffold_details(); 
    }
  }, [selectedOrganism]);

  const handleOrganismChange = (event) => {
    setSelectedOrganism(event.target.value);
    setShowTable(false); // Reset showTable to false when the organism is changed.
  };

  return (
    <div>
      <h1>Statistics Page</h1>
      <h2>Select the organism whose statistics you want to check:</h2>
      <p>
        <select value={selectedOrganism} onChange={handleOrganismChange}>
          <option value="">Select an organism</option>
          {data.map((item) => (
            <option key={item.id} value={item.taxon_id}>
              {item.species} {item.strain}
            </option>
          ))}
        </select>
      </p>
      {isLoading && <p>Loading...</p>}
      {showTable && (
        <>
          <div className="rightcolumn"><h2>Gene details</h2>
          <p>No. of records found: {geneData.length}</p>
          <TableView data={geneData} /></div>
          <div className="leftcolumn"><h2>Scaffold details</h2>
          <p>No of records found: {scaffoldData.length}</p>
          <TableView data={scaffoldData} /></div>
        </>
      )}
    </div>
  );
};

export default Statistics;