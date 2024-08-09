import React, {useState}  from 'react';

export default function Dipeptide () {

  const [sequence, setSequence] = useState('');
  const [results, setResults] = useState(null);


  const handleFormChange = async(e) => {
    setResults(null);
    setSequence(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/analysis_tools/dipeptide?sequence=${sequence}`);
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
        <h3> Compute Dipeptide Frequency </h3>
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="8"
          cols="100"
          value={sequence}
          onChange={handleFormChange}
          placeholder="Enter Protein sequence..."
        /> <br></br>
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