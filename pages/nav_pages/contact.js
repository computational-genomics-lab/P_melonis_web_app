import dynamic from 'next/dynamic';
import React from 'react';

// Use Next.js dynamic import for code-splitting so that the heavy View component
// is loaded only when this page is visited.
const View = dynamic(() => import('../components/visualization/test_jbrowse'), {
  loading: () => <p>Loading JBrowse2 view...</p>,
});

const Contact = () => {
  return (
    <div>
      <h3>
        <i>Phytophthora melonis</i> genomes visualized using JBrowse2
      </h3>
      <View />
    </div>
  );
};

export default Contact;
