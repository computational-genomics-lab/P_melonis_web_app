//used in the homepage to show organism details

//call the dots database
//accepts two parameters which are table name and id 
import pool from "./database";

export default function handler(req, res) {
  const { table,id, type } = req.query;
  const query = `SELECT na_sequence_ID, sequence_type_ID, description, taxon_id, length, a_count, t_count, g_count, c_count FROM ${table} WHERE taxon_ID=${id} AND sequence_type_ID=${type}`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}
