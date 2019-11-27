
import * as mysql from "mysql";
import { plainToClass } from "class-transformer";
import { Column, Columns } from "../model/column";
import { Config } from "../model/config";
import { Table } from "../model/table";

export default class DB {

  private pool: mysql.Pool;
  constructor(private config: Config) {
    const connConfig: mysql.ConnectionConfig = config.mysql;
    this.pool = mysql.createPool({
      user: connConfig.user,
      password: connConfig.password,
      database: connConfig.database,
      host: connConfig.host,
      port: connConfig.port
    });
  }

  public query(sql: string, values?: any):Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }

  public async getTableInfo() {
    const tableConfig = this.config.table;
    const tableName = tableConfig.include;
    const tableSchema = tableConfig.schema;

    const table = await this.query("select * from INFORMATION_SCHEMA.TABLES where table_name = ? and table_schema = ?", [
      tableName, tableSchema
    ]);

    const columns = await this.query("select * from INFORMATION_SCHEMA.Columns where table_name = ? and table_schema = ?", [
      tableName, tableSchema
    ]);
    const resultTable = plainToClass(Table, table);
    
    const resultCols = plainToClass(Column, columns);
  
    Object.values(resultCols).map(val=>{

      console.log(val);
    })
    // console.log(resultCols.tableCatalog);

  }
}