import pool from "../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query;

//fetch all the PFAM ids for a particular strain of an organism (denoted by its taxonomy ID)

const query = `SELECT PFAMs FROM Pfam WHERE taxonomy_id=${taxon_id} AND strain_number=${strain_number}`;

  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error});
    } else {
      res.status(200).json({ data: results });
    }
  });
}