import React, {useState}  from 'react';

export default function Matrix () {

  const [sequence, setSequence] = useState('');
  const [results, setResults] = useState(null);
  const [type, setType] = useState(1);

  const handleFormChange = async(e) => {
    setResults(null);
    setSequence(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/analysis_tools/matrix?sequence=${sequence}&type=${type}`);
      console.log(response)
      const data = await response.json();
      console.log(data);
      setResults(data.results); // Assuming the response structure has a 'results' field
    } catch (error) {
      console.error('Error running program:', error);
    }
  };

  return (
    <div>
        <h3> Build Position Specific Scoring Matrix </h3>
        <p>
Position specific scoring matrices are the central features for
motif finding, gene prediction, and also determining conserved-ness
of sequences. This tool takes sequences in single lines and calculates
the position specific scoring matrices for them.</p>
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="8"
          cols="100"
          value={sequence}
          onChange={handleFormChange}
          placeholder="Enter Protein sequence..."
        /> <br></br>

        <select value={type} onChange={(e) => {setResults(null);setType(parseInt(e.target.value))}}>
          <option value={1}>Nucleotide</option>
          <option value={2}>Protein </option>
        </select> <p></p>
        <button type="submit"> Submit </button>
      </form>
      {results && (
        <div>
          <h3> Results:</h3>
          <pre>{results}</pre>
        </div>
      )}
    </div>
  );
}