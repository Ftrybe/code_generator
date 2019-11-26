import DBUtils from "./utils/db.utils";
import { Columen } from "./model/columen";

export default class service{
    constructor(){}
    public start(){
      const db:DBUtils = new DBUtils();
      const conn = db.getConnection();
      conn.query("select * from INFORMATION_SCHEMA.Columns where table_name='sys_diary' and table_schema='note'",(x,y,z)=>{
          const columns:Columen[] = y;
         console.info(y);
      });
      conn.query("select table_name,table_comment from INFORMATION_SCHEMA.Tables where table_name='sys_diary' and table_schema='note'",(x,y,z)=>{
        console.info(y);
      })
      conn.end();
    } 
}