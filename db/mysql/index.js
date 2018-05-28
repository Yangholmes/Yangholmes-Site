/**
 * Mysql Interface
 * @file
 * @author Yangholmes 2018-05-23
 */

const mysql = require('mysql');

class Mysql {
    constructor(options = {}) {
        this.options = options;
        this.connection = mysql.createConnection(options);
        this.connect();
    }

    connect() {
        this.connection.connect(err => {
            if (err) {
                return false;
            }
            this.threadId = this.connection.threadId;
        });
    }

    async useDb(dbName = '') {
        if (dbName.constructor !== String) {
            dbName = null;
        }
        dbName && await this.query(`USE ${dbName};`);
    }

    async dropTable(table = '') {
        if (table.constructor !== String) {
            table = null;
        }
        table && await this.query(`DROP TABLE ${table};`);
    }

    async truncateTable(table = '') {
        if (table.constructor !== String) {
            table = null;
        }
        table && await this.query(`TRUNCATE TABLE ${table}`);
    }

    query(sql = '') {
        if (sql.constructor !== String) {
            sql = null;
        }
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results, fields) => {
                // console.log(error, results, fields);
                error ? reject(error) : resolve(results, fields);
            });
        });
    }

    terminate() {
        this.connection.end(error => {

        });
    }

    destroy() {
        this.connection.destroy();
    }
}

module.exports = Mysql;
