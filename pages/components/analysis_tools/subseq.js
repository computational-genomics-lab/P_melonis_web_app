import { useState, useContext } from "react";
import { DataContext } from '../context_provider/Datafetcher';

export default function Subseq() {
  const [selectedOrganism, setSelectedOrganism] = useState("");
  const [contig, setContig] = useState('');
  const [startPosition, setStartPosition] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [results, setResults] = useState(null);
  const [strand, setStrand] = useState(1);
  const { data } = useContext(DataContext);

  const handleOrganismChange = (e) => {
    setSelectedOrganism(e.target.value);
    setResults(null);
  }

  const handleFormChange = (e) => {
    setContig(e.target.value);
    setResults(null);
  }

  const handleStartChange = (e) => {
    setStartPosition(e.target.value);
    setResults(null);
  }

  const handleEndChange = (e) => {
    setEndPosition(e.target.value);
    setResults(null);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/analysis_tools/subsequence?contig=${contig}&organism=${selectedOrganism}&start=${startPosition}&end=${endPosition}&strand=${strand}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error running BLAST:', error);
    }
  };

  return (
    <div>
    <h3>Subsequence retrieval </h3>
      List of organisms:
      <select value={selectedOrganism} onChange={handleOrganismChange}>
        <option value=''>Select an organism</option>
        {data.map((item) => {
        const speciesWords = item.species.split(' ');
        const speciesAbbreviation = speciesWords[0].substring(0, 3) + speciesWords[1].substring(0, 2);
        const modifiedValue = speciesAbbreviation + (item.strain ? `_${item.strain}` : '') + '_v1';
            return (
              <option key={item.id} value={modifiedValue}>
                {item.species} {item.strain}
              </option>
            );
          })}
      </select>
      <p></p>
      <form onSubmit={handleFormSubmit}>
        {/* <input
          type="text"
          value={contig}
          onChange={handleFormChange}
          placeholder="Enter DNA contig..."
        /> */}
    <textarea
          value={contig}
          onChange={handleFormChange}
          placeholder="Enter contig ..."
        />
         <p></p>
        <input
          type="text"
          value={startPosition}
          onChange={handleStartChange}
          placeholder="Start position"
        /> <br></br>
        <input
          type="text"
          value={endPosition}
          onChange={handleEndChange}
          placeholder="End position"
        /> <br></br>
        <select value={strand} onChange={(e) => {setResults(null);setStrand(parseInt(e.target.value))}}>
          <option value={1}>Reference Strand</option>
          <option value={2}>Reverse Strand</option>
        </select> <p></p>
        <button type="submit">Submit</button>
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