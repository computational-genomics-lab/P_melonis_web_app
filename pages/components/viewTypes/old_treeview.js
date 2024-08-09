//older tree.. doesn't look very nice

import React, { useState, useEffect } from "react";

function Tree() {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    fetch("/api/[sql_connection]?field='Organism'")
      .then(res => res.json())
      .then(data => {
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
            treeNodes[order].nodes[genus].nodes[species].nodes[strain] = { key: strain, label: strain };
          } else {
            treeNodes[order].nodes[genus].nodes[species].nodes = { ...treeNodes[order].nodes[genus].nodes[species].nodes };
          }
        });
        setTreeData(Object.values(treeNodes));
      })
      .catch(err => console.error(err));
  }, []);

  const renderTreeNodes = nodes => {
    return Object.values(nodes).map(node => {
      if (node.nodes) {
        return (
          <li key={node.key}>
            <details>
              <summary>{node.label}</summary>
              <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>{renderTreeNodes(node.nodes)}</ul>
            </details>
          </li>
        );
      } else {
        return <li key={node.key}>{node.label}</li>;
      }
    });
  };

  return (
    <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
      {treeData.map(node => (
        <li key={node.key}>
          <details>
            <summary>{node.label}</summary>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>{renderTreeNodes(node.nodes)}</ul>
          </details>
        </li>
      ))}
    </ul>
  );
}

export default Tree;
