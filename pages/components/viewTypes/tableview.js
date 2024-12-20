// import React from 'react';
// import { Table } from 'antd';

// const TableView = ({ data}) => {
//   const columns = Object.keys(data[0]).map((key) => {
//     return {
//       title: key.toUpperCase(),
//       dataIndex: key,
//       key: key,
//     };
//   });

//   return <Table columns={columns} dataSource={data} />;
// };

// export default TableView;
// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Button } from 'antd';
// import * as XLSX from 'xlsx';

// const TableView = ({ data, taxonID = null, strainNumber = null }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [isGeneModalVisible, setIsGeneModalVisible] = useState(false);

//   const [geneDetails, setGeneDetails] = useState(null);
//   const [END_POSITION, setEndPosition] = useState(null);
//   const [START_POSITION, setStartPosition] = useState(null);
//   const [at_percentage, setAtPercentage] = useState(null);
//   const [gc_percentage, setGcPercentage] = useState(null);
//   const [gene_sequence, setGeneSequence] = useState(null);
//   const [length, setLength] = useState(null);
//   const [name, setName] = useState(null);
//   const [parent_scaffold, setParentScaffold] = useState(null);

//   useEffect(() => {
//     if (geneDetails && geneDetails.length > 0) {
//       const details = geneDetails[0];
//       setEndPosition(details.END_POSITION);
//       setStartPosition(details.START_POSITION);
//       setAtPercentage(details.at_percentage);
//       setGcPercentage(details.gc_percentage);
//       setGeneSequence(details.gene_sequence);
//       setLength(details.length);
//       setName(details.name);
//       setParentScaffold(details.parent_scaffold);
//     }
//   }, [geneDetails]);
//   // Handle double-click to show full text in modal
//   const handleDoubleClick = (text) => {
//     setModalContent(text);
//     setModalVisible(true);
//   };

//   // Handle fetching gene details if taxonID and strainNumber are provided
//   const fetchGeneDetails = async (geneName) => {
//     if (!taxonID || !strainNumber) return;
//     try {
//       const response = await fetch(
//         `/api/statistics_calls/additional_gene_details?gene_name=${geneName}&taxon_id=${taxonID}&strain_number=${strainNumber}`
//       );
//       const details = await response.json();
//       setGeneDetails(details.data);
//       setIsGeneModalVisible(true);
//     } catch (error) {
//       console.error('Error fetching gene details:', error);
//     }
//   };

//   // Handle closing modals
//   const handleCloseModal = () => setModalVisible(false);
//   const handleCloseGeneModal = () => setIsGeneModalVisible(false);

//   // Download table data to Excel
//   const downloadExcel = () => {
//     const worksheetData = [
//       Object.keys(columns[0]).map((col) => col.title), // Headers
//       ...data.map((row) => columns.map((col) => row[col.dataIndex])) // Data rows
//     ];
//     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
//     XLSX.writeFile(workbook, 'table_data.xlsx');
//   };

//   // Define table columns with render functions
//    const columns = Object.keys(data[0] || {}).map((key) => ({
//     title: key.toUpperCase(),
//     dataIndex: key,
//     key,
//     render: (text) => {
//       // Render KEGG Pathway or KEGG rclass links with truncation
//       if ((key === 'KEGG_Pathway' || key === 'KEGG_rclass') && text) {
//         const links = text.split(',');
//         const MAX_DISPLAY_LINKS = 3; // Number of links to show initially
  
//         // Show only the first few links, with a "Show more" option if there are additional links
//         return (
//           <div>
//             {links.slice(0, MAX_DISPLAY_LINKS).map((id, index) => (
//               <a
//                 key={id + index}
//                 href={`https://www.kegg.jp/entry/${id}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ display: 'block' }} // Display each link on a new line for better readability
//               >
//                 {id}
//               </a>
//             ))}
//             {links.length > MAX_DISPLAY_LINKS && (
//               <a
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleDoubleClick(text); // Opens a modal with the full list of links
//                 }}
//                 style={{ color: '#1890ff', textDecoration: 'underline', cursor: 'pointer' }}
//               >
//                 Show more
//               </a>
//             )}
//           </div>
//         );
//       }
  
//       if (key === 'KEGG_ko' && text) {
//         return text.split(',').map((id) => (
//           <a key={id} href={`https://www.kegg.jp/entry/${id.replace('ko:', '')}`} target="_blank" rel="noopener noreferrer">
//             {id}
//           </a>
//         ));
//       }
      
//       // for gene additional details page
//       if (key === 'gene_name' && text && taxonID && strainNumber) {
//         return (
//           <a href="#" onClick={(e) => { e.preventDefault(); fetchGeneDetails(text); }}>
//             {text}
//           </a>
//         );
//       }
//       // Default text truncation for long values
//       if (text && text.length > 50) {
//         const truncatedText = text.substring(0, 50) + '...';
//         return (
//           <div
//             style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', width: '200px' }}
//             onDoubleClick={() => handleDoubleClick(text)}
//             title={text}
//           >
//             {truncatedText}
//           </div>
//         );
//       }
//       return text;
//     },
//   }));
  

//   return (
//     <>
//       <Button onClick={downloadExcel} style={{ marginBottom: '16px' }}>Download Table</Button>
//       <Table columns={columns} dataSource={data} rowKey={(record) => record.id || record.gene_name} pagination={{ pageSize: 10 }} />

//       {/* Modal to show full text on double-click */}
//       <Modal visible={modalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} title="Full Value">
//         <pre>{modalContent}</pre>
//       </Modal>

//       {/* Modal to show gene details if available */}
//       <Modal visible={isGeneModalVisible} onOk={handleCloseGeneModal} onCancel={handleCloseGeneModal} title="Gene Details">
 
//       {geneDetails ? (
//         <div>
//           <p>Name: {name}</p>
//           <p>Parent Scaffold: {parent_scaffold}</p>
//           <p>Start Position: {START_POSITION}</p>
//           <p>End Position: {END_POSITION}</p>
//           <p>AT Percentage: {at_percentage}</p>
//           <p>GC Percentage: {gc_percentage}</p>
//           <p>Length: {length}</p>
//           <p>Gene Sequence: {gene_sequence}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//       </Modal>
//     </>
//   );
// };

// export default TableView;

import React from 'react';
import { useRouter } from 'next/router';
import { Table, Button } from 'antd';

const TableView = ({ data, taxonID = null, strainNumber = null }) => {
  const router = useRouter();

  // Redirect to Gene Details Page with required parameters
  // const fetchGeneDetails = (geneName) => {
  //   if (!taxonID || !strainNumber) return;
  //   router.push({
  //     pathname: `/components/${geneName}`,
  //     query: { taxonID, strainNumber },
  //   });
  // };

  const fetchGeneDetails = (geneName) => {
    if (!taxonID || !strainNumber) return;
    const url = `/components/${geneName}?taxonID=${taxonID}&strainNumber=${strainNumber}`;
    window.open(url, '_blank');
  };
  

  // Dummy function for handleDoubleClick and downloadExcel as placeholders
  const handleDoubleClick = (text) => {
    console.log("Double-clicked text:", text); // Replace with modal logic if needed
  };

  const downloadExcel = () => {
    console.log("Downloading Excel..."); // Replace with actual download logic
  };

  // Define table columns with render functions
  const columns = Object.keys(data[0] || {}).map((key) => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key,
    render: (text) => {
      if (key === 'gene_name' && text && taxonID && strainNumber) {
        return (
          <a href="#" target="_blank" onClick={(e) => { e.preventDefault(); fetchGeneDetails(text); }}>
            {text}
          </a>
        );
      }
      // Render KEGG Pathway or KEGG rclass links with truncation
      if ((key === 'KEGG_Pathway' || key === 'KEGG_rclass') && text) {
        const links = text.split(',');
        const MAX_DISPLAY_LINKS = 3;
        return (
          <div>
            {links.slice(0, MAX_DISPLAY_LINKS).map((id, index) => (
              <a
                key={id + index}
                href={`https://www.kegg.jp/entry/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block' }}
              >
                {id}
              </a>
            ))}
            {/* {links.length > MAX_DISPLAY_LINKS && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDoubleClick(text);
                }}
                style={{ color: '#1890ff', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Show more
              </a>
            )} */}
          </div>
        );
      }

      if (key === 'KEGG_ko' && text) {
        return text.split(',').map((id) => (
          <a key={id} href={`https://www.kegg.jp/entry/${id.replace('ko:', '')}`} target="_blank" rel="noopener noreferrer">
            {id}
          </a>
        ));
      }

      // Default text truncation for long values
      if (text && text.length > 50) {
        const truncatedText = text.substring(0, 50) + '...';
        return (
          <div
            style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', width: '200px' }}
            onDoubleClick={() => handleDoubleClick(text)}
            title={text}
          >
            {truncatedText}
          </div>
        );
      }

      return text;
    },
  }));

  return (
    <div>
      <Button onClick={downloadExcel} style={{ marginBottom: '16px' }}>Download Table</Button>
      <Table columns={columns} dataSource={data} rowKey={(record) => record.id || record.gene_name} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default TableView;
