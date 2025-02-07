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
  const { data } = useContext(DataContext);
  const [treeData, setTreeData] = useState([]);
  const { setSelectedValues, setSelectedOrganisms } = useContext(SelectedValuesContext);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const createTreeNodes = (items) => {
      const orderMap = new Map();
      
      const safeItems = items || [] ;
     safeItems.forEach((item) => {
        const { orders: order, genus, species, strain } = item;
        const speciesName = `${species} ${strain}`;

        if (!orderMap.has(order)) {
          orderMap.set(order, { key: order, title: order, children: [] });
        }

        const orderNode = orderMap.get(order);

        let genusNode = orderNode.children.find((node) => node.key === genus);
        if (!genusNode) {
          genusNode = { key: genus, title: genus, children: [] };
          orderNode.children.push(genusNode);
        }

        genusNode.children.push({ key: speciesName, title: speciesName });
      });

      setTreeData([...orderMap.values()]);
    };

    createTreeNodes(data);
  }, [data]);

  const handleCheckboxSelection = (selectedKeys) => {
    setKeys(selectedKeys);
    const selectedTaxonIds = [];
    const selectedSpecies = [];

    const taxonMap = new Map(data.map(item => [`${item.species} ${item.strain}`, item.taxon_id]));

    const findTaxonId = (treeNodes) => {
      treeNodes.forEach((node) => {
        if (selectedKeys.includes(node.key) && taxonMap.has(node.key)) {
          const item = taxonMap.get(node.key);
          selectedTaxonIds.push(item);

          const speciesWords = node.key.split(' ');
          const speciesAbbreviation = speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 2);
          const modifiedValue = speciesAbbreviation + (speciesWords[2] ? `_${speciesWords[2]}` : '') + '_v1';
          selectedSpecies.push(modifiedValue);
        }

        if (node.children) findTaxonId(node.children);
      });
    };

    findTaxonId(treeData);

    setSelectedValues(selectedTaxonIds);
    setSelectedOrganisms(selectedSpecies.join(',')); // Set as a comma-separated string
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
