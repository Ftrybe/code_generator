"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class DBUtils {
    constructor() {
        this.connection = mysql.createConnection({
            user: 'root',
            password: "admin",
            database: 'note',
            host: '127.0.0.1',
            port: 3306
        });
    }
    getConnection() {
        this.connection.connect(function (error) {
            if (!!error) {
                console.log(error);
            }
            else {
                console.log('Connected!:)');
            }
        });
        return this.connection;
    }
}
exports.default = DBUtils;
//# sourceMappingURL=db.utils.js.map