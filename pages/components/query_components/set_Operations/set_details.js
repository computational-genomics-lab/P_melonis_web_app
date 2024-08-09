import React, { useState, useEffect } from 'react';
import TableView from '../../viewTypes/tableview';
import PieChart from '../../plotting/piechart';
import generatePieData from '../piechart_data_gen';

const SetDetails = ({ intersectResult }) => {
  console.log('these are the intersect results passed on by the set_operations file:', intersectResult);
  const [metadata, setMetadata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [piedata, setPiedata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/querypage_calls/gene_ids?id=${intersectResult.join(',')}`);
        const data = await response.json();
        setMetadata(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gene IDs:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [intersectResult]);

  useEffect(() => {
    if (metadata.length > 0) {
      const newPiedata = generatePieData(metadata);
      setPiedata(newPiedata);
    }
  }, [metadata]);

  const tableData = metadata.map((item) => {
    return {
      gene_ID: item.gene_ID,
      name: (
        <a href={`http://10.0.0.231:3000/api/querypage_calls/gene_ids?id=${item.gene_ID}`}>{item.name}</a>
      ),
      description: item.description,
    };
  });

  return (
    <>
      {console.log(piedata)}
      <h2>{intersectResult.length} common genes are present in the tables you selected</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="leftcolumn">
            <PieChart data={piedata} />
          </div>
          <TableView data={tableData} />
        </>
      )}
    </>
  );
};

export default SetDetails;


// import React, { useState, useEffect } from 'react';
// import TableView from '../tableview';

// const SetDetails = ({ intersectResult }) => {
//   const [metadata, setMetadata] = useState([]); // State to store the fetched data
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   const fetchData = async (geneId) => {
//     try {
//       const response = await fetch(`/api/querypage_calls/gene_ids?id=${geneId}`);
//       const jsonData = await response.json();
//       setMetadata((prevMetadata) => [...prevMetadata, jsonData.data]); // Extract jsonData.data object instead of wrapping it in an array
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const fetchDataForIntersect = async () => {
//       setIsLoading(true); // Set loading state to true

//       for (const geneId of intersectResult) {
//         await fetchData(geneId);
//       }

//       setIsLoading(false); // Set loading state to false after fetching is complete
//     };

//     fetchDataForIntersect();
//   }, [intersectResult]);

//   return (
//     <>
//       <h2>{intersectResult.length} common genes are present in the tables you selected</h2>
// {/* 
//       {intersectResult.map((geneId) => (
//         <li key={geneId}>{geneId}</li>
//       ))} */}

//       {/* Render the TableView component only when loading is complete */}
//       <div>
//       {isLoading ? (
//         <p>Loading metadata...</p>
//       ) : (
//         <TableView data={metadata.flat()} /> //concatenating sub-arrays within an array, flattening them into a single-dimensional array.
//       )}
//  </div>
//     </>
//   );
// };

// export default SetDetails;