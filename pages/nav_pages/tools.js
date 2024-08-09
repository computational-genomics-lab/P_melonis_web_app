import React from 'react';
import styles from 'styles/query.module.css'
import { useState } from 'react';

//import all the functions which will be shown in the query navigation bar
import MyBlastForm from '../components/analysis_tools/blast';
import Pairwise from '../components/analysis_tools/pairwise';
import Dipeptide from '../components/analysis_tools/dipepfreq';
import Subseq from '../components/analysis_tools/subseq';
import Matrix from '../components/analysis_tools/matrix';
import Emboss from '../components/analysis_tools/emboss';

const Tools =() => {
  const [activeTab, setActiveTab] = useState('blast');

  const renderComponent = () => {
    switch (activeTab) {
      case 'blast':
        return <MyBlastForm />;
      case 'pair':
        return <Pairwise />;
      case 'dipep':
        return <Dipeptide />;
      case 'subseq':
        return <Subseq />;
      case 'matrix':
        return <Matrix />;
        case 'emboss':
        return <Emboss />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className={styles.verticalNav}>
        <ul>
          {/* <li tabIndex={0}>
            <a href="http://10.0.0.231/emboss/" target="_blank">
              <span>EMBOSS</span>
            </a>
          </li> */}
          <li
            tabIndex={0}
            className={activeTab === 'emboss' ? styles.active : ''}
            onClick={() => setActiveTab('emboss')}
          >
            EMBOSS
          </li>          
          <li
            tabIndex={0}
            className={activeTab === 'blast' ? styles.active : ''}
            onClick={() => setActiveTab('blast')}
          >
            Local Multi-BLAST 
          </li>
          <li
            tabIndex={0}
            className={activeTab === 'pair' ? styles.active : ''}
            onClick={() => setActiveTab('pair')}
          >
            Pairwise Alignment
          </li>
          <li
            tabIndex={0}
            className={activeTab === 'dipep' ? styles.active : ''}
            onClick={() => setActiveTab('dipep')}
          >
            Dipeptide Frequency
          </li>
          <li
            tabIndex={0}
            className={activeTab === 'matrix' ? styles.active : ''}
            onClick={() => setActiveTab('matrix')}
          >
            Build Weight Matrix
          </li>
         
        </ul>
      </nav>
      <div className='rightcolumn'>{renderComponent()}</div>
    </div>
  );
}

export default Tools;
