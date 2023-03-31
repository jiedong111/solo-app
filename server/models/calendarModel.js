const { Pool } = require('pg');

const PG_URI = 'postgres://rhdfewpf:ZwaU_Ds7hucPQy49hxcgU1Hmbg_A_HIn@raja.db.elephantsql.com/rhdfewpf'

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}