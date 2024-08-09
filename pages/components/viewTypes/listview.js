import { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context_provider/Datafetcher';
import Details from '../details_fetcher';

const OrganismList = () => {
  const { data, loading, handleClick, expanded } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const [metadata, setMetadata] = useState([]); // organism metadata from dots table
  const [showTable, setShowTable] = useState(false);
  const [selectedValue, setSelectedValue] = useState('1'); //showing scaffold information by default
  const [taxon, setTaxon] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (showTable) {
      fetchMetaData('nasequenceimp', taxon, selectedValue);
    }
  }, [showTable, taxon, selectedValue]);

  const fetchMetaData = async (option, taxon, type) => {
    try {
      const response = await fetch(`/api/organism_details?table=${option}&id=${taxon}&type=${type}`);
      const jsonData = await response.json();
      setMetadata(jsonData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (event, taxon) => {
    event.stopPropagation();
    setTaxon(taxon);
    setShowTable(true);
    setDropdownVisible(true);
  };

  const close = () => {
    setShowTable(false);
    setDropdownVisible(false);
  };


    const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setShowTable(true);
    setDropdownVisible(true);
    setMetadata([]); // Reset metadata when dropdown value changes
  };
  return (
    <div>
      <div className='leftcolumn'>
        {/* <h4>click on an organism in the list to know more about it !</h4> */}

        <ul>
          {data.map((item) => (
            <li key={item.taxon_ID} onClick={(event) => handleClick(event, item.taxon_ID)}>
              {item.species} {item.strain}
              {/* {expanded === item.taxon_ID && (
                <ul>
                  <button className='Button' onClick={(event) => handleSelect(event, item.taxon_ID)}>
                    Details
                  </button>
                  <button className='Button' onClick={close}>
                    CLOSE
                  </button>
                </ul>
              )} */}
            </li>
          ))}
        </ul>
      </div>

      {showTable && (
        <div className='rightcolumn'>
          {dropdownVisible && (
            <select value={selectedValue} onChange={handleDropdownChange}>
              <option value='1'>Scaffold</option>
              <option value='5'>Expressed Sequence Tags</option>
              <option value='6'>Genes</option>
              <option value='7'>Some</option>
              
              <option value='8'>Repeat Regions</option>
            </select>
          )}
          {console.log(metadata)}
          {metadata.length > 0 ? (
            <Details data={metadata} selectedValue={selectedValue} />
          ) : (
            <div>Loading metadata...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganismList;
