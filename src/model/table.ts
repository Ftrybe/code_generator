export interface Table {
    tableCatalog: string;
    // 关联的数据库
    tableSchema: string;
    // 表名
    tableName: string;

    typeType: string;

    engine: string;

    version: number;

    rowFormat: string;

    avgRowLength: number;

    dataLength: number;

    maxDataLength: number;

    indexLength: number;

    dataFree: number;

    autoIncrement: number;

    createTime: Date;

    updateTime: Date;

    checkTime: Date;

    tableCollation: string;

    checkSum: number;

    createOptions: string;

    tableComment: string;

}
