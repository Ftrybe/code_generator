import DBUtils from "./utils/db.utils";
import { Column } from "./model/column";
import { plainToClass } from "class-transformer";
import { FormatUtils } from "./utils/format.utils.ts";
import { stringify } from "querystring";
export default class service{
    constructor(){}
    public start(){
      const db:DBUtils = new DBUtils();
      const conn = db.getConnection();
      conn.query("select * from INFORMATION_SCHEMA.Columns where table_name='sys_diary' and table_schema='note'",(error,data,fieldInfo)=>{
          
          Object.values(data).map(m=>{
          const map = plainToClass(Column,m);
          // console.log(m);
          })
          // Object.values(data).map((rowDatta,index:number,array:unknown[])=>{
          //   map.set("columns",rowDatta);
          //   // array[index] = "c";
          // })
          // console.log(map);
          // Object.keys(data[0]).map(value=>{
          // console.log(FormatUtils.toCamelCase(value.toLocaleLowerCase()));

          // })
          
          // Object.values(y).map(v=>{
          //   Object.keys(v).map(s=>{
          //    s = s.toLocaleLowerCase();
          //   })
          // })
          // const columns:Columen[] = y;
      });
      conn.query("select * from INFORMATION_SCHEMA.Tables where table_name='sys_diary' and table_schema='note'",(x,y,z)=>{
         console.info(y);
      })
      conn.end();
    } 
}