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

const query=`select nf.na_feature_ID,nf.name, nl.start_min AS START_POSITION ,nl.end_min AS END_POSITION,
ens.source_ID,nf.na_sequence_ID from externalnasequence ens, nalocation nl,nafeatureimp nf where ens.taxon_ID=${taxon_ID} 
and ens.strain_number=${strain_number} and ens.source_ID='${scaffold}' and ens.sequence_type_ID != 1 
and nf.subclass_view not like '%CDS%' and nf.subclass_view not like '%GeneFeature%' and 
nf.subclass_view not like '%exonfeature%' and nf.na_sequence_ID=ens.na_sequence_ID and
 nl.na_feature_ID=nf.na_feature_ID and (nl.start_min between ${start} and ${end} or nl.end_min 
 between ${start} and ${end}) order by nl.start_min`;

  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}