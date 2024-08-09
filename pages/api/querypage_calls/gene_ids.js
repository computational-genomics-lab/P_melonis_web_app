// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import mysql from 'mysql';

// const pool = mysql.createPool({
//   // connectionLimit: 10,
//   host: '10.0.0.230',
//   user: 'testadmin',
//   password: 'forinventorydatabase',
//   database: 'oomycetes_cgl_dots',
// });

// export default function handler(req, res) {
//   const {id} = req.query;
//   const query = `SELECT name, gene_ID, description FROM gene WHERE gene_ID=${id}`;
//   pool.query(query, (error, results) => {
//     if (error) {
//       res.status(500).json({ error });
//     } else {
//       res.status(200).json({ data: results });
//     }
//   });
// }

//takes a list of gene ids and makes a single API call with this bulk
//basically gene details are fetched

import pool from "../database";

export default function handler(req, res) {
  const { id } = req.query;
  const ids = Array.isArray(id) ? id : [id]; // Convert id to an array if it's a single value

  const query = `SELECT name, gene_ID, description FROM gene WHERE gene_ID IN (${ids.join(',')})`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}
