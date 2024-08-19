//fetch all the gene details in the selected organism

import pool from "../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query; //accepts taxon_ID of particular organism

const query = `SELECT name, source_ID as parent_scaffold, length
 FROM externalnasequence WHERE sequence_type_ID=6 AND
  strain_number=${strain_number} AND taxon_ID=${taxon_id}`;

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