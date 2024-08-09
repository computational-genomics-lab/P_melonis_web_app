import { useState, useContext } from "react";
import Barchart from "./chart";
import { DataContext } from "../context_provider/Datafetcher";

function BArPlot(){

  const { data, loading } = useContext(DataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

          const [selectedProp, setSelectedProp] = useState('orders');

          const handlePropChange = (e) => {
            setSelectedProp(e.target.value);
          };
          
          const orders = data.reduce((acc, item) => {
            const orderName = item[selectedProp];
            const strainCount = acc[orderName] ? acc[orderName] + 1 : 1;
            return { ...acc, [orderName]: strainCount };
          }, {});
          
          const orderData = Object.keys(orders).map((orderName) => ({
            order: orderName,
            strainCount: orders[orderName],
          }));
  
          return (
            <div>
              <h1>Number of strains : {selectedProp}</h1>
              <label htmlFor="prop-select">Select property:</label>
      <select id="prop-select" value={selectedProp} onChange={handlePropChange}>
        <option value="orders">Order</option>
        <option value="genus">Genus</option>
       
      </select>
              <Barchart data={orderData} />
            </div>
          );
        }

export default BArPlot;
