// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import pool from "../database";

export default function handler(req, res) {
  const { table,id, slug } = req.query;
  const query = `SELECT * FROM ${table} WHERE taxon_ID=${id} ${slug}`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}