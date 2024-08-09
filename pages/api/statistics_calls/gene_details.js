//fetch all the gene details in the selected organism

import pool from "../database";

export default function handler(req, res) {
  const { id} = req.query; //accepts taxon_ID of particular organism

const query = `SELECT ena.name,ena.source_ID AS parent_scaffold,ena.length,gi.description FROM externalnasequence
 ena,nafeature nf,geneinstance gi where ena.taxon_ID=${id} and ena.sequence_version=1 and ena.sequence_type_ID=6 and
 nf.na_sequence_ID=ena.na_sequence_ID and nf.name='gene' and gi.na_feature_ID=nf.na_feature_ID`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}