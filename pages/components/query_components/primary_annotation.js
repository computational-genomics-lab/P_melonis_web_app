import React, {useContext, useState} from 'react';
import 'rc-tree/assets/index.css';
import Checktree from '../viewTypes/checkbox_tree';
import { SelectedValuesContext } from '../context_provider/selectedvaluescontext';
import TableView from '../viewTypes/tableview';

const Primary = () => {
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
      const response = await fetch(`/api/querypage_calls/primary_annotation?id_list=${selectedValues.join(',')}&name=${name}`);
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
      <h2> Search for gene by primary annotation: </h2>
      <Checktree />
      {console.log(selectedValues)}
  <br></br>
       <form onSubmit={handleFormSubmit}>
          enter primary annotation:  <input type="text" value={name} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>

 <br></br>
    {isLoading && <p>Loading...</p>} 
      {isButtonClicked ? (
  data !== undefined ? (
    data.length > 0 ? (
      <TableView data={data} />
    ) : (
      <p>Select organisms from checkbox and enter a valid primary annotation name </p>
    )
  ) : (
    <p>Enter valid id </p>
  )
) : null}  
</div></div>
  );
};

export default Primary;