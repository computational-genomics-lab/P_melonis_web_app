import pool from "../database";

export default function handler(req, res) {
  const { id_list, kegg_id} = req.query;
//   const parsedIdList = JSON.parse(id_list);

  const ids = id_list.split(',').map(Number);

const f_string = ids.map((id) => `pd.taxon_id = ${id}`).join(' OR ');

const query = `SELECT pd.name, pd.na_sequence_id, pd.ko_id, pd.name, orr.species,
 pd.url FROM pathway_data pd, oomycetes_cgl_sres.organism orr 
WHERE orr.taxon_id = pd.taxon_id 
AND orr.version = pd.version 
AND (${f_string}) 
AND pd.version = 1 
AND pd.ko_id LIKE '${kegg_id}'`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error, f_string });
    } else {
      res.status(200).json({ data: results });
    }
  });
}