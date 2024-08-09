import React, {useContext, useState} from 'react';
import 'rc-tree/assets/index.css';
import Checktree from '../viewTypes/checkbox_tree';
import { SelectedValuesContext } from '../context_provider/selectedvaluescontext';
import TableView from '../viewTypes/tableview';

const Protein_domain = () => {
  const [data, setData] = useState([]);
  const { selectedValues} = useContext(SelectedValuesContext);
  const [name, setName] = useState('')
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleInputChange = (event) => {
    setIsButtonClicked(false);
    setName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/querypage_calls/protein_domain?id_list=${selectedValues.join(',')}&name=${name}`);
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
      <div>
      <h2> Quick Search for Protein Domain/motif/function </h2>
      <Checktree />
      {console.log(data)}
  <br></br>
       <form onSubmit={handleFormSubmit}>
       Enter Protein Domain/motif/function : <input type="text" value={name} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>

 <br></br>
    {isLoading && <p>Loading...</p>} 
      {isButtonClicked ? (
  data !== undefined ? (
    data.length > 0 ? (
      <TableView data={data} />
    ) : (
      <p>Select organisms from checkbox and enter a valid domain name </p>
    )
  ) : (
    <p>Enter valid domain name </p>
  )
) : null}  
<p>Search for Protein domain/motif/function curated from Interproscan Analysis
Example: WW domain </p>
</div></div>
  );
};

export default Protein_domain;