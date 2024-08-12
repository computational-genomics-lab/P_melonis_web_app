import pool from "../database";

export default function handler(req, res) {
  const { taxon_id, strain_number} = req.query;
//   const parsedIdList = JSON.parse(id_list);

//   const ids = id_list.split(',').map(Number);

// const f_string = ids.map((id) => `pd.taxon_id = ${id}`).join(' OR ');

//fetch all the KEGG ids for a particular strain of an organism (denoted by its taxonomy ID)

//const query = `SELECT KEGG_ko FROM KEGG WHERE taxonomy_id=${taxon_id} AND strain_number=${strain_number}`;
const query = `SELECT KEGG_ko, KEGG_Pathway, KEGG_Module, KEGG_rclass FROM KEGG WHERE taxonomy_id=${taxon_id} AND strain_number=${strain_number}`;

  pool.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error});
    } else {
      res.status(200).json({ data: results });
    }
  });
}