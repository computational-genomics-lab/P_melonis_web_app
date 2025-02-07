// pages/tools.js (or wherever you want this page/component)
import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from 'styles/query.module.css'; // using the same CSS module as query.js
// import ErrorBoundary from '../components/ErrorBoundary';

// Dynamically import each analysis tool component with Suspense enabled.
const MyBlastForm = dynamic(
  () => import('../components/analysis_tools/blast'),
  { suspense: true }
);
const Pairwise = dynamic(
  () => import('../components/analysis_tools/pairwise'),
  { suspense: true }
);
const Dipeptide = dynamic(
  () => import('../components/analysis_tools/dipepfreq'),
  { suspense: true }
);
const Subseq = dynamic(
  () => import('../components/analysis_tools/subseq'),
  { suspense: true }
);
const Matrix = dynamic(
  () => import('../components/analysis_tools/matrix'),
  { suspense: true }
);
const Emboss = dynamic(
  () => import('../components/analysis_tools/emboss'),
  { suspense: true }
);

const Tools = () => {
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
            Local BLAST 
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
          {/* If you want to include subseq, add a corresponding <li> here:
          <li
            tabIndex={0}
            className={activeTab === 'subseq' ? styles.active : ''}
            onClick={() => setActiveTab('subseq')}
          >
            Subsequence Analysis
          </li>
          */}
        </ul>
      </nav>
      <div className="rightcolumn">
        {/* 
          Wrap the component rendering in Suspense so that if the dynamic import
          is still loading, a fallback is displayed.
          Optionally, wrap it in an ErrorBoundary if you want to catch errors.
        */}
        <Suspense fallback={<p>Loading component...</p>}>
          {/*
            <ErrorBoundary>
              {renderComponent()}
            </ErrorBoundary>
          */}
          {renderComponent()}
        </Suspense>
      </div>
    </div>
  );
};

export default Tools;
