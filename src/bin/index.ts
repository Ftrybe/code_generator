#!/usr/bin/env node

/**
 * Module dependencies.
 */
var fs = require("fs");
var path = require('path');
var rootDir = require('../lib/path');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

});
// 获得表重字段注释
connection.query("select COLUMN_NAME,column_comment from INFORMATION_SCHEMA.Columns where table_name='sys_diary' and table_schema='note'",(x,y,z)=>{
  console.info(y);
});
connection.query("select table_name,table_comment from INFORMATION_SCHEMA.Tables where table_name='sys_diary' and table_schema='note'",(x,y,z)=>{
  console.info(y);
})

