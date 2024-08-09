//fetch all the gene details in the selected organism

import pool from "../database";

export default function handler(req, res) {
  const { id} = req.query; //accepts taxon_ID of particular organism

const query = `select source_ID AS scaffold_name,length from externalnasequence where sequence_type_ID=1 and taxon_ID=${id} and sequence_version=1 order by length desc
`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}