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
import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import * as XLSX from 'xlsx';

const TableView = ({ data, taxonID = null, strainNumber = null }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [geneDetails, setGeneDetails] = useState(null);
  const [isGeneModalVisible, setIsGeneModalVisible] = useState(false);

  // Handle double-click to show full text in modal
  const handleDoubleClick = (text) => {
    setModalContent(text);
    setModalVisible(true);
  };

  // Handle fetching gene details if taxonID and strainNumber are provided
  const fetchGeneDetails = async (geneName) => {
    if (!taxonID || !strainNumber) return;
    try {
      const response = await fetch(
        `/api/statistics_calls/additional_gene_details?gene_name=${geneName}&taxon_id=${taxonID}&strain_number=${strainNumber}`
      );
      const details = await response.json();
      setGeneDetails(details.data);
      setIsGeneModalVisible(true);
    } catch (error) {
      console.error('Error fetching gene details:', error);
    }
  };

  // Handle closing modals
  const handleCloseModal = () => setModalVisible(false);
  const handleCloseGeneModal = () => setIsGeneModalVisible(false);

  // Download table data to Excel
  const downloadExcel = () => {
    const worksheetData = [
      Object.keys(columns[0]).map((col) => col.title), // Headers
      ...data.map((row) => columns.map((col) => row[col.dataIndex])) // Data rows
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };

  // Define table columns with render functions
  const columns = Object.keys(data[0] || {}).map((key) => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key,
    render: (text) => {
      if (key === 'KEGG_ko' && text) {
        return text.split(',').map((id) => (
          <a key={id} href={`https://www.kegg.jp/entry/${id.replace('ko:', '')}`} target="_blank" rel="noopener noreferrer">
            {id}
          </a>
        ));
      }
      if ((key === 'KEGG_Pathway' || key === 'KEGG_rclass') && text) {
        return text.split(',').map((id) => (
          <a key={id} href={`https://www.kegg.jp/entry/${id}`} target="_blank" rel="noopener noreferrer">
            {id}
          </a>
        ));
      }
      if (key === 'PFAMs' && text) {
        return text.split(',').map((id) => (
          <a key={id} href={`https://www.ebi.ac.uk/interpro/search/text/${id}`} target="_blank" rel="noopener noreferrer">
            {id}
          </a>
        ));
      }
      if (key === 'gene_name' && text && taxonID && strainNumber) {
        return (
          <a href="#" onClick={(e) => { e.preventDefault(); fetchGeneDetails(text); }}>
            {text}
          </a>
        );
      }
      if (text && text.length > 50) {
        const truncatedText = text.substring(0, 50) + '...';
        return (
          <div
            style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', width: '200px' }}
            onDoubleClick={() => handleDoubleClick(text)}
            title={text}
          >
            {truncatedText} (Hover or Double click to view full record)
          </div>
        );
      }
      return text;
    },
  }));

  // Destructure properties from geneDetails object
  const {
    END_POSITION,
    START_POSITION,
    at_percentage,
    gc_percentage,
    gene_sequence,
    length,
    name,
    parent_scaffold,
  } = geneDetails || {};

  return (
    <>
      <Button onClick={downloadExcel} style={{ marginBottom: '16px' }}>Download Table</Button>
      <Table columns={columns} dataSource={data} rowKey={(record) => record.id || record.gene_name} pagination={{ pageSize: 10 }} />

      {/* Modal to show full text on double-click */}
      <Modal visible={modalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} title="Full Value">
        <pre>{modalContent}</pre>
      </Modal>

      {/* Modal to show gene details if available */}
      <Modal visible={isGeneModalVisible} onOk={handleCloseGeneModal} onCancel={handleCloseGeneModal} title="Gene Details">
        {geneDetails ? (
                     <pre>{JSON.stringify(geneDetails, null, 2)}</pre> 
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </>
  );
};

export default TableView;
