import pool from '../database';

export default function handler(req, res) {
  const { id} = req.query;
  const query = `SELECT 
  g.name, 
  g.gene_ID, 
  g.description, 
  nsi.length AS length_in_bases,
  nl.start_min AS start_position, 
  nl.end_min AS end_position, 
  nsi.sequence, 
  nsi.description AS organism_description, 
  nsi.string1 AS scaffold
FROM 
  gene g
  JOIN geneinstance gi ON g.gene_ID = gi.gene_ID
  JOIN nalocation nl ON gi.na_feature_ID = nl.na_feature_ID
  JOIN nafeatureimp nfi ON nfi.na_feature_ID = gi.na_feature_ID
  JOIN nasequenceimp nsi ON nsi.na_sequence_ID = nfi.na_sequence_ID
WHERE 
  g.name = '${id}'`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}