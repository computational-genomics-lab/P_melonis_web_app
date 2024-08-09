//For fetching organism details from nasequenceimp table..info about scaffolds, genes,
//repeats etc.

//this is information that is available in the home page..available when a particular
//user clicks on an item in the list 

import React from "react";

const Details =({data, selectedValue}) =>{


  //what is selected value? 1 : scaffold ; 6 : contigs and so on

  let property;

  switch (selectedValue) {
    case '1':
      property = 'scaffold';
      break;
    case '5':
      property = 'EST'
    case '6':
      property = 'gene';
      break;
    case '7':
      property = 'unknown';
      break;
    case '8':
      property = 'Repeat';
      break;
    }

    const rowCount = data.length;
   // const organismName = data.length > 0 ? data[0].description.split(',')[0].split('=')[1].trim() : '';
    const organismName = data.length > 0 ? data[0].description : '';

  
    const totalLength = data.reduce((sum, obj) => sum + obj.length, 0);
    const avglength = totalLength / rowCount

    const g_count = data.reduce((sum, obj) => sum + obj.g_count, 0);
    const c_count = data.reduce((sum, obj) => sum + obj.c_count, 0);
    const a_count = data.reduce((sum, obj) => sum + obj.c_count, 0);
    const t_count = data.reduce((sum, obj) => sum + obj.c_count, 0);

    const total = (g_count + c_count + a_count + t_count)
    const gc= ((g_count + c_count) * 100)/ total
    const at = ((a_count + t_count) * 100) /total 
    return (
        <div>
            <p> Organism Name : {organismName}</p>
          <p>Number of {property}s: {rowCount}</p>
          <p>Total length of all {property}s : {totalLength}</p>
          <p> Average length of each {property} : {avglength}</p>
          <p> Average GC percentage of each {property} : {gc} </p>
          <p>Average AT percentage of each {property} : {at} </p>
          {/* Render other components or display the data */}
        </div>
      );
}

export default Details