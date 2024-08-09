import pool from "../database";

export default function handler(req, res) {
  const { id_list, name} = req.query;

  const ids = id_list.split(',').map(Number);

const f_string = ids.map((id) => `ns.taxon_id = ${id}`).join(' OR ');

const query = `select ns.name, ns.na_sequence_id, tr.product , orr.species, orr.taxon_id, 
orr.version from transcript tr, externalnasequence ns, organism orr
where tr.product like '${name}' and
 ns.na_sequence_id = tr.na_sequence_id
 and orr.taxon_id= ns.taxon_id and orr.version = ns.sequence_version
 and (${f_string})`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error, f_string });
    } else {
      res.status(200).json({ data: results });
    }
  });
}