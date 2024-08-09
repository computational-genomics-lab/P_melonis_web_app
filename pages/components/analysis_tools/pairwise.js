import React, { useState } from 'react';

function Pairwise() {
  const [sequence1, setSequence1] = useState('');
  const [sequence2, setSequence2] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/analysis_tools/pairwise?sequence1=${sequence1}&sequence2=${sequence2}`);
      const data = await response.json(); // Extract JSON data from the response
      console.log(data)
      setResult(data.results);
    } catch (error) {
      setResult('An error occurred during sequence comparison.');
    }
  };

  return (
    <div>
      <h3>Enter the sequences</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="8"
          cols="100"
          value={sequence1}
          onChange={(e) => {setResult(null); setSequence1(e.target.value)}}
          placeholder="Enter the first sequence"
        />
        <br />
        <textarea
          rows="8"
          cols="100"
          value={sequence2}
          onChange={(e) => {setResult(null) ; setSequence2(e.target.value)}}
          placeholder="Enter the second sequence"
        />
        <br />
        <p></p>
        <button type="submit">Compare Sequences</button>
      </form>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default Pairwise;
