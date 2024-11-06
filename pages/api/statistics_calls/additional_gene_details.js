//this is called when one gene id is clicked on to fetch more details about the gene

import pool from "../database";

export default function handler(req, res) {
  const { gene_name, taxon_id, strain_number } = req.query;

  const query = `
    SELECT DISTINCT
      ena.name,
      ena.source_ID AS parent_scaffold,
      nl.start_min AS START_POSITION,
      nl.end_min AS END_POSITION,
      ((ena.a_count + ena.t_count)/(ena.a_count + ena.t_count + ena.g_count + ena.c_count) * 100) AS at_percentage,
      ((ena.g_count + ena.c_count)/(ena.a_count + ena.t_count + ena.g_count + ena.c_count) * 100) AS gc_percentage,
      ena.length,
      ena.sequence AS gene_sequence
    FROM
      externalnasequence ena
    JOIN
      nafeatureimp nf ON nf.na_sequence_ID = ena.na_sequence_ID
    JOIN
      nalocation nl ON nl.na_feature_ID = nf.na_feature_ID
    WHERE
      ena.name = ? 
      AND ena.sequence_type_ID = 6
      AND nf.subclass_view = "gene"
      AND ena.strain_number = ?
      AND ena.taxon_ID = ?;
  `;

  pool.query(query, [gene_name, strain_number, taxon_id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error fetching gene details' });
    } else {
      res.status(200).json({ data: results });
    }
  });
}
