// pages/nav_pages/statistics.js
import React, { useEffect, useContext, useState } from "react";
import dynamic from "next/dynamic";
import { DataContext } from "../components/context_provider/Datafetcher";

// Dynamically import the heavy TableView component.
const TableView = dynamic(
  () => import("../components/viewTypes/tableview"),
  { loading: () => <p>Loading table view...</p> }
);

const Statistics = () => {
  const { data } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [taxonID, setTaxonID] = useState("");
  const [strainNumber, setStrainNumber] = useState("");
  const [geneData, setGeneData] = useState([]);
  const [scaffoldData, setScaffoldData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const Gene_details = async () => {
    setIsLoading(true);
    setShowTable(false);
    try {
      const response = await fetch(
        `/api/statistics_calls/gene_details?taxon_id=${taxonID}&strain_number=${strainNumber}`
      );
      const result = await response.json();
      setGeneData(result.data);
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
        `/api/statistics_calls/scaffold_details?taxon_id=${taxonID}&strain_number=${strainNumber}`
      );
      const result = await response.json();
      setScaffoldData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // When taxonID is set, fetch gene and scaffold details.
    if (taxonID) {
      Gene_details();
      Scaffold_details();
    }
  }, [taxonID, strainNumber]);

  const handleOrganismChange = (event) => {
    const [selectedTaxonID, selectedStrainNumber] = event.target.value.split(",");
    setTaxonID(selectedTaxonID);
    setStrainNumber(selectedStrainNumber);
  };

  // Render a fallback if `data` is not yet available.
  if (!data) {
    return <p>Loading organism data...</p>;
  }

  return (
    <div>
      <h2>Select the organism whose statistics you want to check:</h2>
      <p>
        <select onChange={handleOrganismChange}>
          <option value="">Select an organism</option>
          {data.map((item) => (
            <option
              key={item.organism_ID}
              value={`${item.taxon_ID},${item.strain_number}`}
            >
              {item.species} {item.strain}
            </option>
          ))}
        </select>
      </p>
      {isLoading && <p>Loading...</p>}
      {showTable && (
        <>
          <div className="rightcolumn">
            <h2>Gene details</h2>
            <p>No. of genes found: {geneData.length}</p>
            <TableView
              data={geneData}
              taxonID={taxonID}
              strainNumber={strainNumber}
            />
          </div>
          <div className="leftcolumn">
            <h2>Scaffold details</h2>
            <p>No. of unfragmented scaffolds found: {scaffoldData.length}</p>
            <TableView data={scaffoldData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
