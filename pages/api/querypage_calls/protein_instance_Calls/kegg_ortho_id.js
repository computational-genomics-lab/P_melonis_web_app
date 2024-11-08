import pool from "../../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query;
//   const parsedIdList = JSON.parse(id_list);

//   const ids = id_list.split(',').map(Number);

// const f_string = ids.map((id) => `pd.taxon_id = ${id}`).join(' OR ');

//fetch all the KEGG ids for a particular strain of an organism (denoted by its taxonomy ID)

//const query = `SELECT KEGG_ko FROM KEGG WHERE taxonomy_id=${taxon_id} AND strain_number=${strain_number}`;


const query = `SELECT k.KEGG_ko, k.KEGG_Pathway, k.KEGG_Module, k.KEGG_rclass, pr.name AS gene_name, nf.name AS transcript,
 ena.source_ID AS scaffold FROM KEGG k JOIN protein pr ON 
k.protein_instance_id = pr.protein_ID JOIN geneinstance gi ON pr.gene_instance_ID = gi.gene_instance_ID 
JOIN nafeatureimp nf ON gi.na_feature_ID = nf.na_feature_ID 
JOIN externalnasequence ena ON nf.na_sequence_ID = ena.na_sequence_ID WHERE k.taxonomy_id = ${taxon_id} AND k.strain_number = ${strain_number}`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error});
    } else {
      res.status(200).json({ data: results });
    }
  });
}