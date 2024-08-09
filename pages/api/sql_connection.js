//import from the sres database
//fetch list of organisms from the database

import pool from './database';

pool.getConnection((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default (req, res) => {
  const { table } = req.query;
  //which table should we fetch data from? can be organism or whatever
  pool.query(`SELECT * FROM ${table}`, (error, results, fields) => {
    if (error) {
      console.error('Error querying MySQL database: ', error);
      res.status(500).json({ message: 'Internal server error', error });
      return;
    }
    res.status(200).json(results);
  });
};