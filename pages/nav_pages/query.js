// pages/query.js
import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from 'styles/query.module.css';

// Dynamically import each query component with a fallback 
const SearchPage = dynamic(() => import('../components/query_components/gene_NAME'));
const Protein_Instances = dynamic(() => import('../components/query_components/protein_instance'));
const SetOperations = dynamic(() => import('../components/query_components/set_Operations/set_operations'));
const Primary = dynamic(() => import('../components/query_components/primary_annotation'));
const Genome_location = dynamic(() => import('../components/query_components/genome_location'));
const Cluster_Description = dynamic(() => import('../components/query_components/cluster_description'));
const Protein_domain = dynamic(() => import('../components/query_components/protein_domain'));
const KEGG_Page = dynamic(() => import('../components/query_components/kegg_ortho_ids'));

function Query() {
  // Set the initial active tab (default to a safe value).
  const [activeTab, setActiveTab] = useState('genome_location');

  // Conditionally render the component corresponding to the active tab.
  const renderComponent = () => {
    switch (activeTab) {
      case 'gene_name':
        return <SearchPage />;
      case 'kegg_page':
        return <KEGG_Page />;
      case 'protein_instances':
        return <Protein_Instances />;
      case 'cluster_desc':
        return <Cluster_Description />;
      case 'gene_details':
        return <SetOperations />;
      case 'genome_location':
        return <Genome_location />;
      case 'primary':
        return <Primary />;
      case 'protein_domain':
        return <Protein_domain />;
      // case 'conserved_regions':
      //   return <Conserved_regions />;
      default:
        return <p>No component available.</p>;
    }
  };

  return (
    <div>
      <nav className={styles.verticalNav}>
        <ul>
          <li
            tabIndex={0}
            className={activeTab === 'genome_location' ? styles.active : ''}
            onClick={() => setActiveTab('genome_location')}
          >
            Search by and Visualise Genome Location
          </li>
          <li
            tabIndex={0}
            className={activeTab === 'primary' ? styles.active : ''}
            onClick={() => setActiveTab('primary')}
          >
            Search by Primary Annotation
          </li>
          <li
            tabIndex={0}
            className={activeTab === 'kegg_page' ? styles.active : ''}
            onClick={() => setActiveTab('kegg_page')}
          >
            Query by KEGG Orthology ID
          </li>
          <li
            tabIndex={0}
            className={activeTab === 'protein_instances' ? styles.active : ''}
            onClick={() => setActiveTab('protein_instances')}
          >
            Bulk View/Download KEGG/COG/PFAM Data
          </li>
          {/* Uncomment or add more items as needed */}
        </ul>
      </nav>

      <div className="rightcolumn">
        {/* 
          The Suspense boundary below catches any delays in loading your dynamically imported
          components and displays a fallback. This helps avoid errors like calling .map on null.
        */}
        <Suspense fallback={<p>Loading component...</p>}>
          {renderComponent()}
        </Suspense>
      </div>
    </div>
  );
}

export default Query;
