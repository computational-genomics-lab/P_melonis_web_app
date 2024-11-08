import pool from "../../database";

export default function handler(req, res) {
  const { name, taxon_id, strain_number} = req.query;


if (!taxon_id) {
    return res.status(400).send("Missing taxon_id parameter");
  }

 const query=`SELECT k.KEGG_ko, k.KEGG_Pathway, k.KEGG_Module, k.KEGG_rclass, ena.name AS gene_name, nf.name AS transcript,
  ena.source_ID AS Scaffold FROM KEGG k JOIN protein pr ON 
 k.protein_instance_id = pr.protein_ID JOIN geneinstance gi ON pr.gene_instance_ID = gi.gene_instance_ID JOIN 
 nafeatureimp nf ON gi.na_feature_ID = nf.na_feature_ID 
 JOIN externalnasequence ena ON nf.na_sequence_ID = ena.na_sequence_ID WHERE k.taxonomy_id = ${taxon_id} AND 
 k.strain_number = ${strain_number} AND k.KEGG_ko LIKE "%${name}%"`;

  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error});
    } else {
      res.status(200).json({ data: results });
    }
  });
}