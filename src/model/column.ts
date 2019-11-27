import { Expose } from "class-transformer";

export class Column {
    
    @Expose({ name: "TABLE_CATALOG" })
    tableCatalog: string;
    // 关联的数据库
    @Expose({ name: "TABLE_SCHEMA" })
    tableSchema: string;
    // 表名
    @Expose({ name: "TABLE_NAME" })
    tableName: string;
    // 列名
    @Expose({ name: "COLUMN_NAME" })
    columnName: string;
    // 位置
    @Expose({ name: "ORDINAL_POSITION" })
    ordinalPosition: number;
    // 字段默认值
    @Expose({ name: "COLUMN_DEFAULT" })
    columnDefault: string;
    // 是否为空
    @Expose({ name: "IS_NULLABLE" })
    isNullable: boolean;
    // 数据类型
    @Expose({ name: "DATA_TYPE" })
    dataType: string;
    // 特征最大长度
    @Expose({ name: "CHARACTER_MAXIMUM_LENGTH" })
    characterMaximumLength: number;
    // 字符长度
    @Expose({ name: "CHARACTER_OCTET_LENGTH" })
    characterOctetLength: number;

    @Expose({ name: "NUMERIC_PRECISION" })
    numericPrecision: number;

    @Expose({ name: "NUMERIC_SCALE" })
    numericScale: number;

    @Expose({ name: "DATETIME_PRECISION" })
    datetimePrecision: number;

    @Expose({ name: "CHARACTER_SET_NAME" })
    characterSetName: string;

    @Expose({ name: "COLLATION_NAME" })
    collationName: string;

    @Expose({ name: "COLUMN_TYPE" })
    columnType: string;

    @Expose({ name: "COLUMN_KEY" })
    columnKey: string;

    @Expose({ name: "EXTRA" })
    extra: string;

    @Expose({ name: "PRIVILEGES" })
    privileges: string;

    @Expose({ name: "COLUMN_COMMENT" })
    columnComment: string;

    @Expose({ name: "GENERATION_EXPRESSION" })
    generationExpression: string;
    
    @Expose({ name: "SRS_ID" })
    srsId: string;

}
export class Columns{
    column:Column[];
}