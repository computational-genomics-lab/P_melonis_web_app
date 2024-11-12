//fetch all the gene details in the selected organism

import pool from "../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query; //accepts taxon_ID of particular organism

const query = `select source_ID AS scaffold_name,length from externalnasequence where 
sequence_type_ID=1 and taxon_ID=${taxon_id} and strain_number=${strain_number} order by length desc`;
  
const params = [taxon_id, strain_number];

pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}