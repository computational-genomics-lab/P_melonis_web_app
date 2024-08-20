//fetch all the gene details in the selected organism

import pool from "../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query; //accepts taxon_ID of particular organism

// const query = `SELECT ena.name, ena.source_ID as parent_scaffold, nl.start_min AS START_POSITION ,
// nl.end_min AS END_POSITION, ena.length FROM externalnasequence ena,nalocation nl,nafeatureimp nf 
// WHERE ena.sequence_type_ID=6 AND nf.subclass_view="gene" AND
//   nf.na_sequence_ID=ena.na_sequence_ID and nl.na_feature_ID=nf.na_feature_ID AND 
//   ena.strain_number=${strain_number} AND ena.taxon_ID=${taxon_id}`;


  const query = `
  SELECT DISTINCT 
    ena.name, 
    ena.source_ID AS parent_scaffold, 
    nl.start_min AS START_POSITION,
    nl.end_min AS END_POSITION, 
    ena.length 
  FROM 
    externalnasequence ena
  JOIN 
    nafeatureimp nf ON nf.na_sequence_ID = ena.na_sequence_ID
  JOIN 
    nalocation nl ON nl.na_feature_ID = nf.na_feature_ID
  WHERE 
    ena.sequence_type_ID = 6 
    AND nf.subclass_view = "gene"
    AND ena.strain_number = ${strain_number} 
    AND ena.taxon_ID = ${taxon_id}
  `;



 //const query =`SELECT ena.name,ena.source_ID AS parent_scaffold,ena.length,gi.description FROM 
 // externalnasequence ena,nafeature nf,geneinstance gi where ena.taxon_ID='120023' and 
 //ena.strain_number='1' and ena.sequence_type_ID='6' and nf.na_sequence_ID=ena.na_sequence_ID 
 //and nf.subclass_view='gene' and gi.na_feature_ID=nf.na_feature_id`
 
 pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}