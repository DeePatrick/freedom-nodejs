// Update with your config settings.

module.exports = {

  development: 
  {
    client: "sqlite3",
    connection: { filename: "./public/javascripts/mortgage.sqlite"  },
    migrations: { tableName: 'knex_migrations'},
    seeds:      { directory: './public/javascripts/seeds'      },
    // pool:
    // {
    //   afterCreate: function(conn, cb) { conn.run("PRAGMA foreign_keys=ON", cb); }
    // },
    // debug: false
  },

  production: 
  {
      client: 'mysql',
      connection: {
        host : 'freedom.c7kayilqty2l.eu-west-2.rds.amazonaws.com',
        user : 'patrick',
        password : 'actionMAN123',
        database : 'Mortgage'
      },
      migrations: { tableName: 'mortgage_migrations' },
      seeds:      { directory: './public/javascripts/seeds'         },
      debug: false
  }


  // production: 
  // {
  //     client: 'pg',
  //     connection: {
  //       host : 'postgressinstance.c7kayilqty2l.eu-west-2.rds.amazonaws.com',
  //       user : 'patrick',
  //       password : 'actionMAN123',
  //       database : 'Mortgage'
  //     },
  //     migrations: { tableName: 'knex_migrations' },
  //     seeds:      { directory: './public/javascripts/seeds'         },
  //     debug: false
  // }
};
