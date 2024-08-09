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
import { Table, Modal } from 'antd';

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

  const columns = Object.keys(data[0]).map((key) => {
    return {
      title: key.toUpperCase(),
      dataIndex: key,
      key: key,
      render: (text) => {
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
      <Table columns={columns} dataSource={data} />
      <Modal visible={modalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} title="Full Value">
        <pre>{modalContent}</pre>
      </Modal>
    </>
  );
};

export default TableView;
