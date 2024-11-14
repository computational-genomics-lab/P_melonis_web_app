// this is the genedetails page

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const GeneDetailsPage = () => {
  const router = useRouter();
  const { geneName, taxonID, strainNumber } = router.query;
  const [geneDetails, setGeneDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeneDetails = async () => {
      if (!geneName || !taxonID || !strainNumber) return;

      try {
        const response = await fetch(
          `/api/statistics_calls/additional_gene_details?gene_name=${geneName}&taxon_id=${taxonID}&strain_number=${strainNumber}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch gene details: ${response.statusText}`);
        }

        const details = await response.json();
        
        // If details.data is an array, use the first item
        setGeneDetails(Array.isArray(details.data) ? details.data[0] : details.data);
      } catch (error) {
        console.error('Error fetching gene details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeneDetails();
  }, [geneName, taxonID, strainNumber]);

  if (loading) return <p>Loading...</p>;
  if (!geneDetails) return <p>No gene details found for this entry.</p>;

  return (
    <div>
      <h2>Gene Details for {geneName} gene </h2>
      <p>Name: {geneDetails.name}</p>
      <p>Parent Scaffold: {geneDetails.parent_scaffold}</p>
      <p>Start Position: {geneDetails.START_POSITION}</p>
      <p>End Position: {geneDetails.END_POSITION}</p>
      <p>AT Percentage: {geneDetails.at_percentage}</p>
      <p>GC Percentage: {geneDetails.gc_percentage}</p>
      <p>Length: {geneDetails.length}</p>
      {/* <p>Gene Sequence: {geneDetails.gene_sequence}</p> */}
      <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      Gene Sequence: {geneDetails.gene_sequence}
      </p>
    </div>
  );
};

export default GeneDetailsPage;
