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
import { Table, Modal, Button} from 'antd';
import * as XLSX from 'xlsx';

const TableView = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleDoubleClick = (text) => {
    setModalContent(text);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent('');
  };
  const downloadExcel = () => {
    const worksheetData = [
      columns.map(col => col.title), // Headers
      ...data.map(row => columns.map(col => row[col.dataIndex])) // Data rows
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };
  const columns = Object.keys(data[0]).map((key) => {
    return {
      title: key.toUpperCase(),
      dataIndex: key,
      key: key,

      //creating clickable links 
      render: (text) => {
        //for KEGG ids
        if (key === 'KEGG_ko' && text) {
          const keggIds = text.split(','); // Split by comma
          const urls = keggIds.map(id => (
            <a key={id} href={`https://www.kegg.jp/entry/${id.replace('ko:', '')}`} target="_blank" rel="noopener noreferrer">
              {id}
            </a>
          ));
          return <div>{urls.reduce((prev, curr) => [prev, ', ', curr])}</div>;
        }
        if ((key === 'KEGG_Pathway' || key === 'KEGG_rclass') && text) {
          const keggIds = text.split(','); // Split by comma
          const urls = keggIds.map(id => (
            <a key={id} href={`https://www.kegg.jp/entry/${id}`} target="_blank" rel="noopener noreferrer">
              {id}
            </a>
          ));
          return <div>{urls.reduce((prev, curr) => [prev, ', ', curr])}</div>;
        }

        //for PFAM ids
        if ((key === 'PFAMs') && text) {
          const keggIds = text.split(','); // Split by comma
          const urls = keggIds.map(id => (
            <a key={id} href={`https://www.ebi.ac.uk/interpro/search/text/${id}`} target="_blank" rel="noopener noreferrer">
              {id}
            </a>
          ));
          return <div>{urls.reduce((prev, curr) => [prev, ', ', curr])}</div>;
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
    };
  });

  return (
    <>
     <Button onClick={downloadExcel} style={{ marginBottom: '16px' }}>Download Table</Button>
      <Table columns={columns} dataSource={data} />  
      <Modal visible={modalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} title="Full Value">
        <pre>{modalContent}</pre>
      </Modal>
    </>
  );
};

export default TableView;
