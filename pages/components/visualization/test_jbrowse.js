import React, { useState, useEffect } from 'react';
import { createViewState, JBrowseApp } from '@jbrowse/react-app';
import '@fontsource/roboto';

import config from './config.json';

function View() {
  const [viewState, setViewState] = useState();
  const [stateSnapshot, setStateSnapshot] = useState('');

  useEffect(() => {
    const state = createViewState({
      config,
    });
    setViewState(state);
  }, []);

  if (!viewState) {
    return null;
  }

  return (
    <div style={{ width: '100%', height: '2800px', maxWidth: '2800px', margin: '0 auto', fontSize: '5.2rem' }}>
      <JBrowseApp viewState={viewState} />
      {/* <h3>Code</h3>
      <p>
        The code for this app is available at{' '}
        <a
          href="https://github.com/GMOD/jbrowse-react-app-nextjs-demo"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/GMOD/jbrowse-react-app-nextjs-demo
        </a>
        .
      </p> */}

      {/* <h3>See the state</h3>
      <div>
        <p>
          The button below will show you the current session, which includes
          things like what region the view is showing and which tracks are open.
          This session JSON object can be used in the{' '}
          <code>defaultSession</code> of <code>createViewState</code>.
        </p>
        <button
          onClick={() => {
            setStateSnapshot(JSON.stringify(viewState.session, undefined, 2));
          }}
        >
          Show session
        </button>
      </div> */}

      {/* <textarea value={stateSnapshot} readOnly rows={20} cols={80} /> */}
    </div>
  );
}

export default View;
