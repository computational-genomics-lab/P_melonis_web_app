import pool from "../../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query;

//fetch all the COG ids for a particular strain of an organism (denoted by its taxonomy ID)

//const query = `SELECT COG, prediction_id FROM COG WHERE taxonomy_id=${taxon_id} AND strain_number=${strain_number}`;

const query = `SELECT c.COG, c.prediction_id, pr.name AS gene_name, nl.start_min, 
nl.end_min, ena.source_ID AS scaffold, ena.sequence AS external_sequence FROM COG c JOIN protein pr ON 
c.protein_instance_id = pr.protein_ID JOIN geneinstance gi ON pr.gene_instance_ID = gi.gene_instance_ID 
JOIN nalocation nl ON gi.na_feature_ID = nl.na_feature_ID JOIN nafeatureimp nf ON gi.na_feature_ID = nf.na_feature_ID 
JOIN externalnasequence ena ON nf.na_sequence_ID = ena.na_sequence_ID WHERE c.taxonomy_id = ${taxon_id} AND c.strain_number = ${strain_number}`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error});
    } else {
      res.status(200).json({ data: results });
    }
  });
}