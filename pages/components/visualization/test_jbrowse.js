// import React, { useState, useEffect } from 'react';
// import { createViewState, JBrowseApp } from '@jbrowse/react-app';
// import '@fontsource/roboto';

// import getConfig from './config.js';
// //function is accepting props like name of organism from the parent calling this
// //function. In this case it is pages/nav_pages/contact.js file
// //name of scaffold, position of scaffold info will also be passed as props in the future
// //to this function 

// function View(props) {
//   const [viewState, setViewState] = useState();
//   const [stateSnapshot, setStateSnapshot] = useState('');

//   const config = getConfig(props);
//   useEffect(() => {
//     const state = createViewState({
//       config,
//     });
//     setViewState(state);
//   }, []);

//   if (!viewState) {
//     return null;
//   }

//   return (
//     <>
//       <h1> Jbrowse2 integrated directly into the nextJS app</h1>
//       <JBrowseApp viewState={viewState} />
//       <h3>Code</h3>
//       <p>
//         The code for this app is available at{' '}
//         <a
//           href="https://github.com/GMOD/jbrowse-react-app-nextjs-demo"
//           target="_blank"
//           rel="noreferrer"
//         >
//           https://github.com/GMOD/jbrowse-react-app-nextjs-demo
//         </a>
//         .
//       </p>

//       <h3>See the state</h3>
//       <div>
//         <p>
//           The button below will show you the current session, which includes
//           things like what region the view is showing and which tracks are open.
//           This session JSON object can be used in the{' '}
//           <code>defaultSession</code> of <code>createViewState</code>.
//         </p>
//         <button
//           onClick={() => {
//             setStateSnapshot(JSON.stringify(viewState.session, undefined, 2));
//           }}
//         >
//           Show session
//         </button>
//       </div>
//       <textarea value={stateSnapshot} readOnly rows={20} cols={80} />
//     </>
//   );
// }

// export default View;


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
    <>
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
    </>
  );
}

export default View;
