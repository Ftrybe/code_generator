
import * as mysql from "mysql";
import { plainToClass } from "class-transformer";
import { Column, Columns } from "../model/column";
import { Config, TableConfig } from "../model/config";
import { Table } from "../model/table";
import { DbData } from "../model/db-data";

export default class DB {

  private pool: mysql.Pool;
  constructor(private config: Config) {
    const connConfig: mysql.ConnectionConfig = config.mysql;
    this.pool = mysql.createPool({
      user: connConfig.user,
      password: connConfig.password,
      database: connConfig.database,
      host: connConfig.host,
      port: connConfig.port,
    });
  }

  private query(sql: string, values?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
            connection.release();
          })
        }
      })
    })
  }

  public async getDBData(): Promise<Array<Table>> {
    const tableConfig = this.config.table;
    const excludeList = this.config.table.exclude;
    let includeList: Array<string> = tableConfig.include ? tableConfig.include.split(",") : null;
    const tableSchema = tableConfig.schema;
    if (excludeList) {
      let tableNames: string[] = includeList ? includeList : (await this.query("select TABLE_NAME from INFORMATION_SCHEMA.TABLES where table_schema = ?", [
        tableSchema
      ]));
      includeList = tableNames.filter(tableName => {
        !excludeList.includes(tableName);
      })
    }
    // includeList
    const table = await this.query("select * from INFORMATION_SCHEMA.TABLES where table_name in (?) and table_schema = ?", [
      includeList, tableSchema
    ]);

    const columns = await this.query("select * from INFORMATION_SCHEMA.Columns where table_name in (?) and table_schema = ?", [
      includeList, tableSchema
    ]);
    const tables = new Array<Table>();
    Object.values(table).map(tableV => {
      const resultTable = plainToClass(Table, tableV);
      Object.values(columns).map((columnV: Column, index) => {
        if (columnV.tableName == resultTable.tableName) {
          const col = plainToClass(Column, columnV);
          resultTable.columns.push(col);
        }
      });
      tables.push(resultTable);
    });
    return tables;
  }
}