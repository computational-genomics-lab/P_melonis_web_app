import pool from "../database";

export default function handler(req, res) {
  let { taxon_ID, strain_number, name} = req.query;

    // Replace blank spaces with '%' character in the name variable
    if (name) {
      name = name.replace(/ /g, '%');
    }
  

//const f_string = ids.map((id) => `ns.taxon_id = ${id}`).join(' OR ');

// const query = `select ns.name, ns.na_sequence_id, tr.product , orr.species, orr.taxon_id, 
// orr.version from transcript tr, externalnasequence ns, organism orr
// where tr.product like '${name}' and
//  ns.na_sequence_id = tr.na_sequence_id
//  and orr.taxon_id= ns.taxon_id and orr.version = ns.sequence_version
//  and (${f_string})`;

 const query = `SELECT ns.name, gi.description AS product, orr.species, orr.strain
  FROM externalnasequence ns JOIN transcript tr ON ns.na_sequence_ID = tr.na_sequence_id JOIN
   organism orr ON orr.taxon_ID = ns.taxon_ID AND orr.strain_number = ns.strain_number JOIN
    geneinstance gi ON gi.na_feature_ID = tr.na_feature_id WHERE gi.description LIKE "%${name}%" 
    AND ns.taxon_ID = ${taxon_ID} AND ns.strain_number = ${strain_number}`;
  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: results });
    }
  });
}