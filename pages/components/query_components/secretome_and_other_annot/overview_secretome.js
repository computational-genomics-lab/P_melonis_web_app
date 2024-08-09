import React, { useState, useEffect, useContext } from 'react';
import PieChart from '../../plotting/piechart';

function Overview({selectedOrganism}) {
  // const { data, loading } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    const fetchMetaData = async (tables, taxon_ID) => {
      try {
        setIsLoading(true);
        const slug = '';
        const promises = tables.map((table) =>
          fetch(`/api/querypage_calls/query?table=${table}&id=${taxon_ID}&slug=${slug}`).then((response) =>
            response.json()
          )
        );
        const responses = await Promise.all(promises);
        console.log(responses);

        const formattedData = responses.map((jsonData, index) => {
          const statistics = jsonData.data.length;
          return { name: tables[index], statistics: statistics };
        });

        setMetadata(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchMetaData function when selectedOrganism changes
    if (selectedOrganism) {
      fetchMetaData(['signalP', 'TMHMM', 'PSORT'], selectedOrganism);
    }
  }, [selectedOrganism]);

  return (
    <div>
      <div className="leftcolumn">
    
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          metadata.length > 0 && <PieChart data={metadata} />
        )}
      </div>
    </div>
  );}

export default Overview;