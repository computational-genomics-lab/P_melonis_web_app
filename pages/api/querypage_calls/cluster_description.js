import pool from "../database";

export default function handler(req, res) { 
    const {desc} = req.query;

    const query = `SELECT pc.gene_id, gi.description, orr.species,
    ns.na_sequence_id,ns.sequence_version,ns.taxon_id,pc.cluster_id,ns.name 
    FROM protein_cluster pc, organism orr, geneinstance gi, externalnasequence 
    ns, nafeatureimp nf WHERE gi.gene_id=pc.gene_id and 
    nf.na_feature_id=gi.na_feature_id and ns.na_sequence_id= nf.na_sequence_id 
    and gi.description like '${desc}' AND
     orr.taxon_id = pc.taxon_id and orr.version=ns.sequence_version`

     pool.query(query, (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          res.status(200).json({ data: results });
        }
      });
}