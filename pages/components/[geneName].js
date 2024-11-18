// this is the genedetails page which accepts the name of gene, taxonID and strain number and subsequently makes an API call 
//to backend mysql database

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VizButton from './visualization/viz_button';

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

  // Derive variables from geneDetails
  const location = `${geneDetails.parent_scaffold}:${geneDetails.START_POSITION}-${geneDetails.END_POSITION}`;
  
  const speciesWords = geneDetails.species.split(' ');
  const name = `${speciesWords[0].substring(0, 3)}${speciesWords[1].substring(0, 3)}_${geneDetails.strain.replace(/\s+/g, '')}`;

  return (
    <div style={{ paddingLeft: '20px',  paddingRight: '20px'}} >
      <h2>Gene Details for {geneName} gene of <i>{geneDetails.species}</i> strain {geneDetails.strain}</h2>
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
            {/* Pass the derived variables to VizButton */}
            <VizButton name={name} location={location} />
    </div>
  );
};

export default GeneDetailsPage;
