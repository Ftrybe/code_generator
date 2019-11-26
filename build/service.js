"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_utils_1 = require("./utils/db.utils");
class service {
    constructor() { }
    start() {
        const db = new db_utils_1.default();
        const conn = db.getConnection();
        conn.query("select * from INFORMATION_SCHEMA.Columns where table_name='sys_diary' and table_schema='note'", (x, y, z) => {
            Object.values(y).map(v => {
                console.log(v);
            });
            const columns = y;
        });
        conn.query("select table_name,table_comment from INFORMATION_SCHEMA.Tables where table_name='sys_diary' and table_schema='note'", (x, y, z) => {
            console.info(y);
        });
        conn.end();
    }
}
exports.default = service;
//# sourceMappingURL=service.js.map