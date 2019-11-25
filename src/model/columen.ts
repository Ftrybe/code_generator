export interface Columen {
    tableCatalog: string;
    // 关联的数据库
    tableSchema: string;
    // 表名
    tableName: string;
    // 列名
    columnName: string;
    // 位置
    ordinalPosition: number;
    // 字段默认值
    columnDefault: string;
    // 是否为空
    isNullable: boolean;
    // 数据类型
    dataType: string;
    // 特征最大长度
    characterMaximumLength: number;
    // 字符长度
    characterOctetLength: number;

    numericPrecision: number;

    numericScale: number;

    datetimePrecision: number;

    characterSetName: string;

    collationName: string;

    columnType: string;

    columnKey: string;

    extra: string;

    privileges: string;

    columnComment: string;

    generationExpression: string;

    srsId: string;

}
