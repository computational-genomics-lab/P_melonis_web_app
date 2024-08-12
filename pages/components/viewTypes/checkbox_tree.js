//renders a checkbox tree which updates the global state called selectedValues
//which is then passed on to whichever query component is calling the checkbox tree

//selectedValues is essentially a list of the corresponding taxon ids of the lowest
//level nodes (which represent the lowest hierarchy or species) of the autocheck tree

import React, { useState, useEffect, useContext } from 'react';
import 'rc-tree/assets/index.css';
import { DataContext } from '../context_provider/Datafetcher';
import Tree from 'rc-tree';
import { SelectedValuesContext } from '../context_provider/selectedvaluescontext';

const Checktree = () => {
  const { data, loading } = useContext(DataContext);
  const [treeData, setTreeData] = useState([]);
  const { selectedValues, setSelectedValues } = useContext(SelectedValuesContext);
  const {setSelectedOrganisms} = useContext(SelectedValuesContext);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
        const createTreeNodes =  (items) => {
          const treeNodes = [];
          try {
            for (const item of items) {
              const order = item.orders;
              const genus = item.genus;
              // const species = `${item.species} ${item.strain} (V${item.version})`;
              const species = `${item.species} ${item.strain}`
              const orderNode = {
                key: order,
                title: order,
                children: [],
              };
              const genusNode = {
                key: genus,
                title: genus,
                children: [],
              };
              const speciesNode = {
                key: species,
                title: species,
              };
      
              const existingOrderNode = treeNodes.find((node) => node.key === order);
              if (existingOrderNode) {
                const existingGenusNode = existingOrderNode.children.find((node) => node.key === genus);
                if (existingGenusNode) {
                  existingGenusNode.children.push(speciesNode);
                } else {
                  genusNode.children.push(speciesNode);
                  existingOrderNode.children.push(genusNode);
                }
              } else {
                genusNode.children.push(speciesNode);
                orderNode.children.push(genusNode);
                treeNodes.push(orderNode);
              }
            }
            setTreeData(treeNodes);
          } catch (error) {
            console.error('Error creating tree nodes:', error);
          }
        };
      
        createTreeNodes(data);
      }, [data]);

  const handleCheckboxSelection = (selectedKeys) => {
    // Find the item.taxon_id for the checked keys
    setKeys(selectedKeys);
    //we use two empty arrays to contain the taxon_ids which will be required for making API calls 
    //by query components
    //the selectedSpecies empty array holds the modified species name which will be used solely for 
    //running multiple BLAST
    const selectedTaxonIds = [];
    const selectedSpecies = [];
    const findTaxonId = (treeNodes) => {
      for (const node of treeNodes) {
        if (selectedKeys.includes(node.key)) {
          // if the node is checked, find its taxon_id from the data
          const item = data.find((item) => {
            const species = `${item.species} ${item.strain} (V${item.version})`;
            return species === node.key;
          });
          if (item) {
            selectedTaxonIds.push(item.taxon_id);
            const speciesWords = item.species.split(' ');
         const speciesAbbreviation = speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 2);
         const modifiedValue = speciesAbbreviation + (item.strain ? `_${item.strain}` : '') + '_v1';
            selectedSpecies.push(modifiedValue);
          }
        }

        if (node.children && node.children.length > 0) {
          findTaxonId(node.children);
        }
      }
    };

    findTaxonId(treeData);
    setSelectedValues(selectedTaxonIds);
    setSelectedOrganisms(selectedSpecies);
  };

  return (
    <div>
      <Tree
        showLine
        selectable
        checkable
        defaultExpandAll
        autoExpandParent
        checkedKeys={keys}
        onCheck={handleCheckboxSelection}
        treeData={treeData}
      />
    </div>
  );
};

export default Checktree;
