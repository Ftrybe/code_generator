var mysql=require('mysql');
var connection =  mysql.createConnection({
    user:'root',
    password: "admin",
    database: 'note',
    host: '127.0.0.1',
    port: 3306
  });
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 