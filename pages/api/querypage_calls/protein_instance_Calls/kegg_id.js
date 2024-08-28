import pool from "../../database";

export default function handler(req, res) {
  const { name, taxon_id, strain_number} = req.query;


if (!taxon_id) {
    return res.status(400).send("Missing taxon_id parameter");
  }
  
const query=`SELECT k.KEGG_ko, k.KEGG_Pathway, k.KEGG_Module, k.KEGG_rclass, pr.name, 
pr.sequence FROM KEGG k JOIN protein pr ON k.protein_instance_id=pr.protein_ID
 WHERE k.taxonomy_id=${taxon_id} AND k.strain_number=${strain_number} AND k.KEGG_ko LIKE "%${name}%"`;

  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error});
    } else {
      res.status(200).json({ data: results });
    }
  });
}