import pool from "../database";

export default function handler(req, res) {
  const { id} = req.query;

  const query = `SELECT pc.gene_id, gi.description , orr.species,ns.na_sequence_id,ns.sequence_version,ns.taxon_id,pc.cluster_id,ns.name FROM oomycetes_cgl_dots.protein_cluster pc, 
  oomycetes_cgl_sres.organism orr, oomycetes_cgl_dots.geneinstance gi,oomycetes_cgl_dots.externalnasequence ns, oomycetes_cgl_dots.nafeatureimp nf WHERE cluster_id =${id} and gi.gene_id=pc.gene_id and nf.na_feature_id=gi.na_feature_id and ns.na_sequence_id= nf.na_sequence_id AND orr.taxon_id = ns.taxon_id and orr.version=ns.sequence_version`;

  
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}