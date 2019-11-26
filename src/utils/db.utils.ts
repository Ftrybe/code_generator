 
import * as mysql from "mysql";
export default class DBUtils{
  private connection:mysql.Connection;
  constructor(){
    this.connection =  mysql.createConnection({
      user:'root',
      password: "admin",
      database: 'note',
      host: '127.0.0.1',
      port: 3306
    });
  }

  public getConnection():mysql.Connection{
    this.connection.connect(function(error){
      if(!!error){
        console.log(error);
      }else{
        console.log('Connected!:)');
      }
    }); 

    return this.connection;
  }
}