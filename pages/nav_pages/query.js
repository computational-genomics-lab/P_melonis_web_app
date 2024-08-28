//a vertical navbar where all the components are called upon clicking a certain link

import React from 'react';
import styles from 'styles/query.module.css'
import { useState } from 'react';

//import all the functions which will be shown in the query navigation bar
import SearchPage from '../components/query_components/gene_NAME';
import Protein_Instances from '../components/query_components/protein_instance';
import SetOperations from '../components/query_components/set_Operations/set_operations';
import Primary from '../components/query_components/primary_annotation';
import Genome_location from '../components/query_components/genome_location';
import Cluster_Description from '../components/query_components/cluster_description';
import Protein_domain from '../components/query_components/protein_domain';
import KEGG_Page from '../components/query_components/kegg_ortho_ids';

function Query() {
  const [activeTab, setActiveTab] = useState('genome_location');

  const renderComponent = () => {
    switch (activeTab) {
      case 'primary':
        return <Primary />;
      case 'gene_name':
        return <SearchPage />;
      case 'kegg_page':
        return <KEGG_Page />;
      case 'protein_instances':
        return <Protein_Instances />;

      case 'cluster_desc':
        return <Cluster_Description />
      // case 'cluster_id':
      //   return <Cluster />;
      // case 'signalP_others':
      //   return <SignalPOthers />;
      case 'primary':
        return <Primary />;
      case 'gene_details':
        return <SetOperations />;
      case 'genome_location':
        return <Genome_location />;
      case 'conserved_regions':
        return <Conserved_regions />;
      case 'protein_domain':
        return <Protein_domain />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className={styles.verticalNav}>
        <ul>
          {/* <li
            tabIndex={0}
            className={activeTab === 'gene_name' ? styles.active : ''}
            onClick={() => setActiveTab('gene_name')}
          >
            Search by Gene Name
          </li> */}
          <li
            tabIndex={0}
            className={activeTab === 'genome_location' ? styles.active : ''}
            onClick={() => setActiveTab('genome_location')}
          >
            Search by and visualise Genome location
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
            Query by KEGG orthology id
          </li>
          <li
            tabIndex={0}
            className={activeTab === 'protein_instances' ? styles.active : ''}
            onClick={() => setActiveTab('protein_instances')}
          >
            Bulk View/Download KEGG/COG/PFAM data
          </li>
          {/* <li
            tabIndex={0}
            className={activeTab === 'primary' ? styles.active : ''}
            onClick={() => setActiveTab('primary')}
          >
            Search by Primary Annotation
          </li> */}

          {/* <li
            tabIndex={0}
            className={activeTab === 'protein_domain' ? styles.active : ''}
            onClick={() => setActiveTab('protein_domain')}
          >
            Quick Search for Protein Domain/motif/function
          </li>
           */}
          {/* <li
            tabIndex={0}
            className={activeTab === 'gene_details' ? styles.active : ''}
            onClick={() => setActiveTab('gene_details')}
          >
            Perform Set Operations
          </li> */}
        </ul>
      </nav>
      <div className='rightcolumn'>{renderComponent()}</div>
    </div>
  );
}

export default Query;