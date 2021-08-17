const mysql = require('mysql'); 
const configF = require('./config/db_config.json');
const configL = require('./config/db_configLocal.json')

module.exports = function () {
    return {
      init: function () {
        return mysql.createPool({
          host: configL.host,
          port: '3306',
          user: configL.user,
          password: configL.password,
          database: configL.database,
          connectionLimit:30
        })
      },
      
      db_open: function (con) {
        con.connect(function (err) {
          if (err) {
            console.error('mysql connection error :' + err);
          } else {
            console.info('mysql is connected successfully.');
          }
        })
      },
      keepAlive: function (con){
        con.getConnection(function(err, connection){
          if(err) { return; }
          connection.ping();
          connection.release();
        });
      },
    }
  };

   /*
  init: function () {
        return mysql.createConnection({
          host: configL.host,
          port: '3306',
          user: configL.user,
          password: configL.password,
          database: configL.database
        })
      },
  */