//This React component renders a button which will redirect user to the jbrowse URL
//for eg : http://10.0.0.234:3001/components/visualization/jbrowse?name=Phymel_CJ26&scaffold=JAMXKT010000007.1&start=1&end=10000
import { useRouter } from 'next/router';
import React from "react";
 
const VizButton =({name, location}) => {

const router = useRouter();

const handleVisualize = () => {
    // Construct the URL with the scaffold and end as query parameters
    const [scaffold, range] = location.split(":");
    const [start, end] = range.split("-");

    const url = `http://10.0.0.234:3001/components/visualization/jbrowse?name=${name}&scaffold=${scaffold}&start=${start}&end=${end}`;
    window.open(url, '_blank');

      // Redirect the user to the constructed URL
      //router.push(url);
    };
    return(
        <button className="Button" onClick={handleVisualize}>Visualize this region </button>
    )
}

export default VizButton;