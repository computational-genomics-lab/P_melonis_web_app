const mysql = require('mysql2');
const pool = mysql.createPool({

  //  host: '139.144.21.44',
  //  user: 'ap_test',
  // password: 'Rochester@mn_55906',
  // database: 'GAL_cgl2'
     host: '10.10.10.7',
   user: 'testadmin',
  password: 'forinventorydatabase',
  database: 'Pmelonis_database'
});

module.exports = pool;
