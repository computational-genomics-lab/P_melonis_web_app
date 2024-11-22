// import React, { useState, useContext } from 'react';
// import { DataContext } from '../context_provider/Datafetcher';

// export default function MyBlastForm() {
//   const [selectedOrganism, setSelectedOrganism] = useState("");
//   const [sequence, setSequence] = useState('');
//   const [results, setResults] = useState(null);
//   const { data } = useContext(DataContext);  

//   const handleOrganismChange = async(e) => {
//     console.log(selectedOrganism);
//     setResults(null);
//     setSelectedOrganism(e.target.value);
//   }

//   const handleFormChange = async(e) => {
//     setResults(null);
//     setSequence(e.target.value)
//   }

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/analysis_tools/blast?sequence=${sequence}&organism=${selectedOrganism}`);
//       console.log(response)
//       const data = await response.json();
//       console.log(data);
//       setResults(data.results); // Assuming the response structure has a 'results' field
//     } catch (error) {
//       console.error('Error running BLAST:', error);
//     }
//   };

//   return (
//     <div>
//     List of organisms : 
//      <select value={selectedOrganism} onChange={handleOrganismChange}>  
//           <option value=''>Select an organism</option>
//           {data.map((item) => {
//         const speciesWords = item.species.split(' ');
//         const speciesAbbreviation = speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 2);
//         const modifiedValue = speciesAbbreviation + (item.strain ? `_${item.strain}` : '') + '_v1';
//             return (
//               <option key={item.id} value={modifiedValue}>
//                 {item.species} {item.strain}
//               </option>
//             );
//           })}
//         </select>
//         <p></p>
//       <form onSubmit={handleFormSubmit}>
//         <textarea
//           rows="8"
//           cols="100"
//           value={sequence}
//           onChange={handleFormChange}
//           placeholder="Enter DNA sequence..."
//         /> <br></br>
//         <button type="submit">Run BLAST</button>
//       </form>
//       {results && (
//         <div>
//           <h2>BLAST Results:</h2>
//           <pre>{results}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useContext } from 'react';
// import 'rc-tree/assets/index.css';
// import Checktree from '../viewTypes/checkbox_tree';
// import { SelectedValuesContext } from '../context_provider/selectedvaluescontext';
// import BlastVisualization from './blaster_vis';

// export default function MyBlastForm() {
  
//   const {selectedOrganisms} = useContext(SelectedValuesContext); //contains modified names from the
//   //checkbox tree which then update these names to selectedvaluescontext.js for global state management
//   const [sequence, setSequence] = useState('');
//   const [results, setResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); 

//   const handleFormChange = async(e) => {
//     setResults(null);
//     setSequence(e.target.value)
//   }
// //Upon clicking on submit button the following function is triggered. The API request
// //is made
//   const handleFormSubmit = async (e) => {
//     setResults(null);
//     e.preventDefault();
//     setIsLoading(true); //show the loading message
//     try {
//       const response = await fetch(`/api/analysis_tools/blast?sequence=${sequence}&organisms=${selectedOrganisms}`);
//       const data = await response.json();
      
//           // Convert data.results to a string
//     // const resultsString = JSON.stringify(data.results);
//     // console.log(resultsString, selectedOrganisms);
//     // setResults(resultsString); // Store the stringified results
//       setResults(data.results); // Assuming the response structure has a 'results' field
//     } catch (error) {
//       console.error('Error running BLAST:', error);
//     } finally {setIsLoading(false)}
//   };

  
//   // const inputFile = 'blast_results.txt';

//   return (
//     <div>
//       <h2>Local BLAST </h2>
//       <h4> Just provide the sequence, not the fasta header </h4>

//       <h3>List of organisms: </h3>
//               <Checktree />

//         <p></p>
//       <form onSubmit={handleFormSubmit}>
//         <textarea
//           rows="8"
//           cols="100"
//           value={sequence}
//           onChange={handleFormChange}
//           placeholder="Enter DNA sequence..."
//         /> <br></br>
//         <button type="submit">Run BLAST</button>
//       </form>
//       {isLoading && <p>Loading...</p>} 
// {results && (
//   <div>
    
//     <h2>BLAST Results:</h2>
//     <h3>selected organism is {selectedOrganisms}</h3>
   
//     {
//     results.length > 0 && (
//     <BlastVisualization blastResults={results}/>

//       )}
   
//     {/* <BlasterJS blastData={results} /> */}

//   </div>
// )}

//     </div>
//   );
// }

import React, { useState, useContext } from 'react';
import 'rc-tree/assets/index.css';
import Checktree from '../viewTypes/checkbox_tree';
import { SelectedValuesContext } from '../context_provider/selectedvaluescontext';
import BlastVisualization from './blaster_vis';

export default function MyBlastForm() {
  const { selectedOrganisms } = useContext(SelectedValuesContext); // Global state
  const [sequence, setSequence] = useState('');
  const [blastType, setBlastType] = useState('blastn'); // State for BLAST type
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e) => {
    setResults(null);
    setSequence(e.target.value);
  };

  const handleBlastTypeChange = (e) => {
    setBlastType(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults(null);
    try {
      const response = await fetch(
        `/api/analysis_tools/blast?sequence=${sequence}&organisms=${selectedOrganisms}&type=${blastType}`
      );
      const data = await response.json();
      setResults(data.results); // Assuming the API returns a `results` field
    } catch (error) {
      console.error('Error running BLAST:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Local BLAST</h2>
      <h4>Just provide the sequence, not the FASTA header</h4>

      <h3>List of organisms:</h3>
      <Checktree />

      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="8"
          cols="100"
          value={sequence}
          onChange={handleFormChange}
          placeholder="Enter DNA sequence..."
        />
        <br />

        {/* BLAST Type Selection */}
        <label htmlFor="blastType">Select BLAST Type:</label>
        <select id="blastType" value={blastType} onChange={handleBlastTypeChange}>
          <option value="blastn">BLASTN</option>
          <option value="tblastn">TBLASTN</option>
          <option value="tblastx">TBLASTX</option>
        </select>
        <br />

        <button type="submit">Run BLAST</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {results && (
        <div>
          <h2>BLAST Results:</h2>
          <h3>Selected Organism(s): {selectedOrganisms}</h3>
          {results.length > 0 && <BlastVisualization blastResults={results} />}
        </div>
      )}
    </div>
  );
}
