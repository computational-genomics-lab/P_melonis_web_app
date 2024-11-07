import pool from "../../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query;

//fetch all the PFAM ids for a particular strain of an organism (denoted by its taxonomy ID)

//const query = `SELECT PFAMs FROM Pfam WHERE taxonomy_id=${taxon_id} AND strain_number=${strain_number}`;


const query = `SELECT p.PFAMs, pr.name AS gene_name, ena.source_ID AS scaffold FROM Pfam p JOIN protein pr ON 
p.protein_instance_id = pr.protein_ID JOIN geneinstance gi ON pr.gene_instance_ID = gi.gene_instance_ID 
JOIN nafeatureimp nf ON gi.na_feature_ID = nf.na_feature_ID 
JOIN externalnasequence ena ON nf.na_sequence_ID = ena.na_sequence_ID WHERE p.taxonomy_id = ${taxon_id} AND p.strain_number = ${strain_number}`;

  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error});
    } else {
      res.status(200).json({ data: results });
    }
  });
}