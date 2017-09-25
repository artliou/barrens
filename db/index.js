const pg = require('pg');

// create a config to configure both pooling behavior and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const config = {
  user: 'brianw_', //env var: PGUSER // TODO: figure out how to create new users
  database: 'barrens', //env var: PGDATABASE
  //password: 'PGPASSWORD', //env var: PGPASSWORD // unneccessary until you set a PW
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT // this should NOT be the same as your server's port
  max: 120, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for 30 seconds and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

// if an error is encountered by a client while it sits idle in the pool
// the pool itself will emit an error event with both the error and
// the client which emitted the original error
// this is a rare occurrence but can happen if there is a network partition
// between your application and the database, the database restarts, etc.
// and so you might want to handle it and at least log it out
pool.on('error', function(err, client) {
  console.error('idle client error', err.message, err.stack);
});

//export the query method for passing queries to the pool
module.exports.query = function(text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function(callback) {
  return pool.connect(callback);
};
