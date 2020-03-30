import { ProjectConfig } from "./config";
import * as Inflected from 'inflected';
import { FormatUtils } from '../utils/format.utils.ts'
import { DbUtils } from '../utils/db.utils';

export class HandlebarJson {
    table: HandlebarsTable = new HandlebarsTable();
    prop: ProjectConfig = new ProjectConfig();
}
export class HandlebarsTable {
    //数据库中保存的表名
    actualTableName: string;
    // 表名
    tableName: string;
    // 注释
    remarks: string;
    catalog: string;
    schema: string;
    // 表名首字母小写
    // tableNameLower: string;
    // 权限
    //表名的复数
    // tableNamePluralize: string;

    // baseColumns: HandlebarsColumn[] = new Array<HandlebarsColumn>();
    allColumns: HandlebarsColumn[] = new Array<HandlebarsColumn>();

    blobColumns: HandlebarsColumn[] = new Array<HandlebarsColumn>();

    get tableNameLower(): string {
        return FormatUtils.toLocaleCase(this.tableName); 
    }
    get tableNamePluralize(): string {
        return  FormatUtils.toLocaleCase(Inflected.pluralize(this.tableName));
    }
    get tableNameSelectivePluralize(): string {
        return  FormatUtils.toLocaleCase(Inflected.pluralize(this.tableName + "Selective"));
    }
    get permissions(): string {
        return this.actualTableName.substring(0, this.actualTableName.indexOf("_")).toLowerCase() + ":" + this.actualTableName.substring(this.actualTableName.indexOf("_") + 1).toLowerCase();
    }
    get allColumnNameLowers(): Array<string> {
        const columnNames = new Array<string>();
        this.allColumns.map(column => {
            columnNames.push(column.columnNameLower);
        })
        return columnNames;
    }

    get primaryKeyColumns(): Array<HandlebarsColumn> {
        let primaryKeyColumns = new Array<HandlebarsColumn>();
        primaryKeyColumns = this.allColumns.filter(column => column.columnKey === "PRI");
        return primaryKeyColumns;
    }
    get baseColumns(): Array<HandlebarsColumn> {
        let baseColumns = new Array<HandlebarsColumn>();
        baseColumns = this.allColumns.filter(column => column.columnKey != "PRI");
        return baseColumns;
    }

    get importList(): Array<string> {
        let importList = new Array<string>();
        this.allColumns.forEach(col => {
            if (!col.javaTypeName.includes("java.lang")) {
                if (!importList.includes(col.javaTypeName)) {
                    importList.push(col.javaTypeName);
                }
            }
        })
        return importList;
    }
}

export class HandlebarsColumn {
    // 数据库对应得列名
    actualColumnName: string;
    // 列名
    columnName: string;
    // 来自 java.sql.Types 的 SQL 类型
    dataType: string;
    // 根据sql类型获得的java类型
    // javaTypeShortName: string;
    // 数据源依赖的类型名称，对于 UDT，该类型名称是完全限定的
    typeName: string;
    // 列的大小
    columnSize: number;

    // 带长度的sql数据类型
    columnType: string;

    // 基数（通常为 10 或 2）
    numPrecRadix: number;
    // 是否允许使用 NULL
    nullable: string;
    // 注释
    remarks: string;
    // 该列的默认值，当值在单引号内时应被解释为一个字符串（可为 null）
    columnDef: string;
    // 对于 char 类型，该长度是列中的最大字节数
    charOctetLength: number;
    //  表中的列的索引（从 1 开始）
    ordinalPosition: number;
    /**
     * ISO 规则用于确定列是否包括 null。
     * YES --- 如果参数可以包括 NULL
     * NO --- 如果参数不可以包括 NULL
     * 空字符串 --- 如果不知道参数是否可以包括 null
     */
    isNullable: string;

    columnKey: string;
    /**
   * 指示此列是否自动增加
   * YES --- 如果该列自动增加
   * NO --- 如果该列不自动增加
   * 空字符串 --- 如果不能确定该列是否是自动增加参数
   */
    isAutoincrement: string;
    // 字段名小写
    get columnNameUpper(): string {
        return FormatUtils.toUpperCase(this.columnName);
    }

    get columnNameLower(): string {
        return FormatUtils.toCamelCase(this.actualColumnName.toLocaleLowerCase());
    }

    /**
  * 列对应的java类型
  *
  * 
  */
    get javaTypeShortName(): string {
        return this.typeName ? DbUtils.convertShortJavaType(this.typeName,this.columnSize) : null;
    }

    // /**
    //  * 列对应的java类型
    //  *
    get javaTypeName(): string {
        // console.log( this.typeName + ":" +this.columnSize);
        return this.typeName ? DbUtils.convertJavaType(this.typeName,this.columnSize) : null;
    }

    get jdbcTypeName(): string {
        return this.typeName? DbUtils.SqlType2JdbcType(this.typeName): null;
    }
}