import pool from "../database";

export default function handler(req, res) {
    const { location, id } = req.query;
    const [scaffold, range] = location.split(":");
    const [start, end] = range.split("-");
  
    const query1 = `SELECT en.na_sequence_id, orr.species, orr.strain 
                   FROM externalnasequence en, oomycetes_cgl_sres.organism orr 
                   WHERE en.taxon_id ='${id}' AND en.sequence_version = 1 
                   AND en.source_id = '${scaffold}' AND en.sequence_type_id = 1 
                   AND orr.taxon_id = '${id}'`;
  
    pool.query(query1, (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        const na_seq_id = results.length > 0 ? results[0].na_sequence_ID : null;

        const query2 = `SELECT CONCAT(orr.species, ' ', orr.strain) AS target_organism,
         CONCAT( ena.source_id, ':', sa.target_start, '-' ,sa.target_end) AS 'target_scaffold:location', 
         CONCAT('${scaffold}', ':' ,sa.query_start, '-', sa.query_end ) AS 'query_scaffold:location'
                        FROM samalignment sa, externalnasequence ena, oomycetes_cgl_sres.organism orr
                        WHERE sa.target_na_sequence_id = ${na_seq_id}
                        AND sa.query_taxon_id != ${id}
                        AND (sa.target_start BETWEEN ${start} AND ${end}
                        OR sa.target_end BETWEEN ${start} AND ${end}
                        OR (sa.target_start <= ${start} AND sa.target_end >= ${end}))
                        AND ena.na_sequence_id = sa.query_na_sequence_id
                        AND orr.taxon_id = sa.query_taxon_id
                        AND orr.version = sa.q_version`;

        
  
        pool.query(query2, (error, results) => {
          if (error) {
            res.status(500).json({ error });
          } else {
            res.status(200).json({ data: results });
          }
        });
      }
    });
  }
  
