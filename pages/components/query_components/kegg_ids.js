import React, { useContext, useState } from 'react';
import Checktree from '../viewTypes/checkbox_tree';
import { SelectedValuesContext } from '../context_provider/selectedvaluescontext';
import TableView from '../viewTypes/tableview';

const KeggOrtho = () => {
  const [data, setData] = useState([]);
  const { selectedValues} = useContext(SelectedValuesContext);
  const [kegid, setKegid] = useState('')
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleInputChange = (event) => {
    setIsButtonClicked(false);
    setKegid(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/querypage_calls/kegg_ortho_id?id_list=${selectedValues.join(',')}&kegg_id=${kegid}`);
      const data = await response.json();
      setData(data.data);
      setIsButtonClicked(true); // Set the flag indicating that the button is clicked

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Search by pathway : </h2>
      <Checktree />
      {console.log(data)}
  <br></br>
      enter KEGG ID : <form onSubmit={handleFormSubmit}>
            <input type="text" value={kegid} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>

 <br></br>
    {isLoading && <p>Loading...</p>} 
      {isButtonClicked ? (
  data !== undefined ? (
    data.length > 0 ? (
      <TableView data={data} />
    ) : (
      <p>Select organisms from checkbox and enter a valid KEGG id </p>
    )
  ) : (
    <p>Enter valid id </p>
  )
) : null}   
<p>Upon entering a KOG ID, the database is searched and if more than one gene 
      maps to the same KOG ID, the out put page shows the list of genes in a table 
      format. There may be instances where the output page contains same gene mapped to
       same KOG ID and the list appears redundant. This happens when the same KOG ID is 
       part of multiple metabolic pathways. e.g; Upon searching for K08269 in Albugo 
       laibachiiNC14 (V1), two records appear identical. This is because the KO ID 
       linked to two different pathways e.g; one connects tomTOR signalling pathway 
       with pathway id ko04150 and the other connects to regulation of autophagy 
       pathway (pathway id ko04140).</p>
    </div>
  );
};

export default KeggOrtho;
