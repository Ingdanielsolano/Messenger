var mysql = require('mysql');

function connection() {
    this.pool = null;

    this.start = function () {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: '172.27.15.29',
            user: 'AdminGiecom',
            password: 'AdminGiecom123',
            database: 'mensajeria'
        })
    }
    this.obtain = function (callback) {
        this.pool.getConnection(function (error, connection) {
            callback(error, connection);
        })
    }
}

module.exports=new connection();