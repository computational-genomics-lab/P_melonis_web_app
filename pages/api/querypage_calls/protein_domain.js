import pool from "../database";

export default function handler(req, res) {
  const { id_list, name} = req.query;

  const ids = id_list.split(',').map(Number);

const f_string = ids.map((id) => `taxon_ID= ${id}`).join(' OR ');

const query = `select na_sequence_id, name, domain_name, taxon_ID, sequence_version, 
species from pdomain_join where domain_name like '${name}' and (${f_string})`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error, f_string });
    } else {
      res.status(200).json({ data: results });
    }
  });
}