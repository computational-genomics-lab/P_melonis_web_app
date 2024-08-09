import React, { useState, useEffect, useContext } from "react";
import TreeMenu from 'react-simple-tree-menu';
import { DataContext } from "../context_provider/Datafetcher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faFolder, faLeaf } from '@fortawesome/free-solid-svg-icons';

export default function TreeViewer() {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const treeNodes = {};
    data.forEach(item => {
      const order = item.orders;
      const genus = item.genus;
      const species = item.species;
      const strain = item.strain;
  
      if (!treeNodes[order]) {
        treeNodes[order] = { key: order, label: order, nodes: {} };
      }
      if (!treeNodes[order].nodes[genus]) {
        treeNodes[order].nodes[genus] = { key: genus, label: genus, nodes: {} };
      }
      if (!treeNodes[order].nodes[genus].nodes[species]) {
        treeNodes[order].nodes[genus].nodes[species] = { key: species, label: species, nodes: {} };
      }
  
      if (strain) {
        if (!treeNodes[order].nodes[genus].nodes[species].nodes[strain]) {
          // Append strain to species if it doesn't exist
          treeNodes[order].nodes[genus].nodes[species].nodes[strain] = {
            key: `${species}-${strain}`,
            label: `${species} - ${strain}`,
          };
        }
      }
    });
    setTreeData(Object.values(treeNodes));
  }, [data]);


  // const handleItemClick = () => {
  //   // Existing onClickItem logic
  //   console.log('Existing onClickItem logic');

  //   window.open(`/components/visualization/jbrowse?name=Phyag_NZFS3770`, '_blank');

  // };

  return (
    <div className="leftcolumn">
       <TreeMenu
         data={treeData}
         debounceTime={125}
         disableKeyboard={false}
         hasSearch
        //  onClickItem={handleItemClick}
         resetOpenNodesOnDataUpdate={true}
         className="my-tree-menu"
         renderLabel={({ node, isOpen }) => (
           <div style={{ paddingLeft: `${node.depth * 10}px` }}>
             {isOpen && <FontAwesomeIcon icon={faFolderOpen} />}
             {!isOpen && <FontAwesomeIcon icon={faFolder} />}
             {node.label}
           </div>
         )}
         renderItem={({ node }) => (
           <div style={{ paddingLeft: `${node.depth * 10}px` }}>
             {node.nodes && Object.keys(node.nodes).length === 0 && (
               <FontAwesomeIcon icon={faLeaf} />
             )}
             {node.label}
           </div>
         )}
       />
    </div>
   );
  
}