//this is a VISUALISATION component for BLAST output


import React, { useEffect } from 'react';

const BlastVisualization = ({blastResults}) => {

  useEffect(() => {
    const blasterjs = require('biojs-vis-blasterjs');
    
    const multiple = document.createElement('div');
    multiple.id = 'blast-multiple-alignments';

    const table = document.createElement('div');
    table.id = 'blast-alignments-table';

    const single = document.createElement('div');
    single.id = 'blast-single-alignment';

    var alignments = `${blastResults}`;
  
    const instance = new blasterjs({
      //input: 'blastinput',
      string: alignments,
      multipleAlignments: 'blast-multiple-alignments',
      alignmentsTable: 'blast-alignments-table',
      singleAlignment: 'blast-single-alignment',
    });
  }, []);

  return (
    <div id="rootDiv">
      {/* <input id="blastinput" type="file" /> */}
      <div id="blast-multiple-alignments"></div>
      <div id="blast-alignments-table"></div>
      <div id="blast-single-alignment"></div>
    </div>

  );
};

export default BlastVisualization;

