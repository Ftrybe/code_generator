import { Columns } from "./column";
import { ProjectConfig } from "./config";

export class HandlebarJson {
    table:HandlebarsTable = new HandlebarsTable();
    prop: ProjectConfig = new ProjectConfig();
}
class HandlebarsTable{
    //数据库中保存的表名
    actualTableName:string;
    // 表名
    tableName:string;
    // 注释
    remarks:string;
    catalog:string;
    schema:string;
    // 表名首字母小写
    tableNameLower:string;
    // 权限
    permissions:string;
    //表名的复数
    tableNamePluralize:string;

    baseColumns:HandlebarsColumn = new HandlebarsColumn();
    primaryKeyColumns:HandlebarsColumn = new HandlebarsColumn();
    blobColumns:HandlebarsColumn = new HandlebarsColumn();
}

class HandlebarsColumn{
    // 对应得表
    table:HandlebarsTable;
    // 数据库对应得列名
    actualColumnName:string;
    // 列名,首字母大写
    columnNameUpper:string;
    // 列名,首字母小写
    columnNameLower:string;
    // 来自 java.sql.Types 的 SQL 类型
    dataType:string;
    // 根据sql类型获得的java类型
    javaTypeShortName:string;
    // 数据源依赖的类型名称，对于 UDT，该类型名称是完全限定的
    typeName:string;
    // 列的大小
    columnSize:number;
    // 基数（通常为 10 或 2）
    numPrecRadix:number;
    // 是否允许使用 NULL
    nullable:number;
    // 注释
    remarks:string;
    // 该列的默认值，当值在单引号内时应被解释为一个字符串（可为 null）
    columnDef: string;
    // 对于 char 类型，该长度是列中的最大字节数
    charOctetLength:number;
    //  表中的列的索引（从 1 开始）
    ordinalPosition:number;
    /**
     * ISO 规则用于确定列是否包括 null。
     * YES --- 如果参数可以包括 NULL
     * NO --- 如果参数不可以包括 NULL
     * 空字符串 --- 如果不知道参数是否可以包括 null
     */
    isNullable:string;
      /**
     * 指示此列是否自动增加
     * YES --- 如果该列自动增加
     * NO --- 如果该列不自动增加
     * 空字符串 --- 如果不能确定该列是否是自动增加参数
     */
    isAutoincrement:string;

       /**
     * 列对应的java类型
     *
     * 
     */
    // public getJavaTypeShortName():string {
    //     let answer = null;
    //     if (this.jdbcTypeInformation != null) {
    //         FullyQualifiedJavaType javaType = jdbcTypeInformation.getFullyQualifiedJavaType();
    //         if (javaType != null) {
    //             answer = javaType.getShortName();
    //         }
    //     }
    //     return answer;
    // }

    // /**
    //  * 列对应的java类型
    //  *
    //  * @return
    //  */
    // public String getJavaTypeName() {
    //     String answer = null;
    //     if (this.jdbcTypeInformation != null) {
    //         FullyQualifiedJavaType javaType = jdbcTypeInformation.getFullyQualifiedJavaType();
    //         if (javaType != null) {
    //             answer = javaType.getFullyQualifiedName();
    //         }
    //     }
    //     return answer;
    // }
}