import { useState, useContext } from 'react';
import { DataContext } from '../../context_provider/Datafetcher';
import SetDetails from './set_details';

function SetOperations() {
  const { data, loading } = useContext(DataContext);
  console.log(data)
  if (loading) {
    return <div>Loading...</div>;
  }

  const [selectedOrganism, setSelectedOrganism] = useState('');
  const [selectedTables, setSelectedTables] = useState([]);
  const [intersectResult, setIntersectResult] = useState([]);

  const fetchMetaData = async (table, taxon_ID) => {
    try {
      const slug = ''
      const response = await fetch(`/api/querypage_calls/query?table=${table}&id=${taxon_ID}&slug=${slug}`);
      const jsonData = await response.json();
      //console.log(jsonData)
      return jsonData.data.map((entry) => entry.gene_ID);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleOrganismChange = (event) => {
   //reset the intersected result and selected tables to null when another organism
   //is selected 
    setSelectedTables([]);
    setIntersectResult([]);
    setSelectedOrganism(event.target.value);
  };

  const handleTableChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTables((prevTables) => [...prevTables, value]);
    } else {
      setSelectedTables((prevTables) => prevTables.filter((table) => table !== value));
    }
  };

  const performSetOperation = async () => {
    const tableResults = [];

    for (const table of selectedTables) {
      const geneIds = await fetchMetaData(table, selectedOrganism);
      tableResults.push({ table, geneIds });
    }

    const intersectedGeneIds = tableResults.reduce((intersect, result) => {
      const { geneIds } = result;
      if (intersect.length === 0) {
        intersect = geneIds;
      } else {
        // intersect = intersect.filter((geneId) => geneIds.includes(geneId));
        //include only the unique geneids
        intersect = intersect.filter((geneId, index) => geneIds.includes(geneId) && intersect.indexOf(geneId) === index);
      }
      return intersect;
    }, []);

    setIntersectResult(intersectedGeneIds);
  };

  return (
    <div>
      <h2>Set Operations</h2>
      <div className='leftcolumn'>
        <p>
          <select value={selectedOrganism} onChange={handleOrganismChange}>
            <option value=''>Select an organism</option>
            {data.map((item) => (
              <option key={item.id} value={item.taxon_id}>
                {item.species} {item.strain}
              </option>
            ))}
          </select>
        </p>
        <p>
          <strong>Select tables:</strong>
        </p>
        <ul>
        <li>
            <label>
              <input
                type='checkbox'
                value='signalP'
                checked={selectedTables.includes('signalP')}
                onChange={handleTableChange}
              />
              Signal P
            </label>
          </li>
          <li>
            <label>
              <input
                type='checkbox'
                value='TMHMM'
                checked={selectedTables.includes('TMHMM')}
                onChange={handleTableChange}
              />
              TMHMM
            </label>
          </li>
          <li>
            <label>
              <input
                type='checkbox'
                value='PSORT'
                checked={selectedTables.includes('PSORT')}
                onChange={handleTableChange}
              />
              PSORT
            </label>
          </li>
        </ul>
        <button onClick={performSetOperation}>Perform Set Operation</button>
      </div>
      {/* Display intersectResult or perform further operations with it */}
      {intersectResult.length > 0 && (
        <div>
          <h3>Intersection Result :</h3>
          <ul>
          <SetDetails intersectResult={intersectResult}/>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SetOperations;
