import { Expose } from "class-transformer";
import { Column } from "./column";

export class Table {
    @Expose({name:"TABLE_CATALOG"})
    tableCatalog: string;
    // 关联的数据库
    @Expose({name:"TABLE_SCHEMA"})
    tableSchema: string;
    // 表名
    @Expose({name:"TABLE_NAME"})
    tableName: string;

    @Expose({name:"TABLE_TYPE"})
    typeType: string;

    @Expose({name:"ENGINE"})
    engine: string;

    @Expose({name:"VERSION"})
    version: number;

    @Expose({name:"ROW_FORMAT"})
    rowFormat: string; 
    
    @Expose({name:"TABLE_ROWS"})
    tableFormat: string;

    @Expose({name:"AVG_ROW_LENGTH"})
    avgRowLength: number;

    @Expose({name:"DATA_LENGTH"})
    dataLength: number;

    @Expose({name:"MAX_DATA_LENGTH"})
    maxDataLength: number;

    @Expose({name:"INDEX_LENGTH"})
    indexLength: number;

    @Expose({name:"DATA_FREE"})
    dataFree: number;

    @Expose({name:"AUTO_INCREMENT"})
    autoIncrement: number;

    @Expose({name:"CREATE_TIME"})
    createTime: Date;

    @Expose({name:"UPDATE_TIME"})
    updateTime: Date;

    @Expose({name:"CHECK_TIME"})
    checkTime: Date;

    @Expose({name:"TABLE_COLLATION"})
    tableCollation: string;

    @Expose({name:"CHECKSUM"})
    checkSum: number;

    @Expose({name:"CREATE_OPTIONS"})
    createOptions: string;

    @Expose({name:"TABLE_COMMENT"})
    tableComment: string;

    columns:Column[] = new Array<Column>();
}
