import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context_provider/Datafetcher';
import TableView from '../../viewTypes/tableview';
import Overview from './overview_secretome';

function SignalPOthers() {
  const { data, loading } = useContext(DataContext);  
//defining all the other hooks
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedOrganism, setSelectedOrganism] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
 useEffect(() => {
    console.log('metadata',metadata);
  }, [metadata]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const fetchMetaData = async (table, taxon_ID) => {
    try {
      setIsLoading(true);
      const slug =''
      const response = await fetch(`/api/querypage_calls/query?table=${table}&id=${taxon_ID}&slug=${slug}`);
      const jsonData = await response.json();
      //console.log(jsonData)
      setMetadata(jsonData.data);
      setShowTable(true);
      setIsLoading(false);

    } catch (error) {
      console.error(error);
    }
  };

  const handleOrganismChange = (event) => {
    setSelectedOrganism(event.target.value);
    setShowTable(false);
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
    setShowTable(false);

  };

  const clickButton = async () => {
    if (selectedOrganism && selectedTable) {
      fetchMetaData( selectedTable, selectedOrganism);
     // console.log("your selections are", selectedOrganism, selectedTable, metadata);
    }
    else {
      if (metadata.length === 0) {
        console.log("Enter both organism and table") ;
      }}
  };

  const close = () => {
    setShowTable(false);
  };

  return (
    <div>
      <h2>Query tables</h2>
      <div className='leftcolumn'>
        <p>
        <select value={selectedOrganism} onChange={handleOrganismChange}>
          <option value=''>Select an organism</option>
          {data.map((item) => (
            <option key={item.id} value={item.taxon_id}>
              {item.species} {item.strain}
            </option>
          ))}
        </select></p>
        <p>To search for all the records in a particular table select the table and click on search! </p>
        <select value={selectedTable} onChange={handleTableChange}>
          <option value=''>Select a table</option>
          <option value='signalP'>signalP</option>
          <option value='TMHMM'>TMHMM</option>
          <option value='PSORT'>PSORT</option>
        </select>
        <button className='Button' onClick={clickButton}>
          Search
        </button>
      </div>
      <Overview selectedOrganism ={selectedOrganism}/>
      {showTable && (
        <ul>
          {console.log(typeof(metadata))}
          {isLoading ? (<p> Loading the metadata </p>) : (<><h1>{metadata.length} records found </h1>
          <TableView data={metadata} /></>)}
        </ul>
      )}
     
    </div>
  );
}

export default SignalPOthers;
