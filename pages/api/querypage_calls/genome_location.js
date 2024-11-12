import pool from "../database";

export default function handler(req, res) {
  const { scaffold, start, end, taxon_ID, strain_number} = req.query;
  // const [scaffold, range] = location.split(":");
  // const [start, end] = range.split("-");
// const query = `select nf.na_feature_id,nf.name, nl.start_min,nl.end_min,
// ens.description, ens.taxon_id,ens.source_id,ens.sequence_version,nf.na_sequence_id,nf.string8,nf.string13
// from externalnasequence ens, nalocation nl,nafeatureimp nf
// where ens.taxon_id='${id}'
// and ens.sequence_version=1
// and ens.source_id='${scaffold}'
// and ens.sequence_type_id != 1
// and nf.subclass_view not like '%CDS%'
// and nf.subclass_view not like '%GeneFeature%'
// and nf.subclass_view not like '%exonfeature%'
// and nf.na_sequence_id=ens.na_sequence_id
// and nl.na_feature_id=nf.na_feature_id
// and
// (nl.start_min between '${start}' and '${end}' or nl.end_min between '${start}' and '${end}')
// order by nl.start_min`;

const query = `
  SELECT 
    nf.name AS gene_name, 
    nl.start_min AS START_POSITION, 
    nl.end_min AS END_POSITION,
    ens.source_ID
  FROM 
    externalnasequence ens
    JOIN nafeatureimp nf ON nf.na_sequence_ID = ens.na_sequence_ID
    JOIN nalocation nl ON nl.na_feature_ID = nf.na_feature_ID 
  WHERE 
    ens.taxon_ID = ? 
    AND ens.strain_number = ? 
    AND ens.source_ID = ? 
    AND ens.sequence_type_ID != 1 
    AND nf.subclass_view NOT LIKE '%CDS%' 
    AND nf.subclass_view NOT LIKE '%GeneFeature%' 
    AND nf.subclass_view NOT LIKE '%exonfeature%' 
    AND (
      nl.start_min BETWEEN ? AND ? 
      OR nl.end_min BETWEEN ? AND ?
    ) 
  ORDER BY 
    nl.start_min
`;

const params = [taxon_ID, strain_number, scaffold, start, end, start, end];

  pool.query(query, params, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}