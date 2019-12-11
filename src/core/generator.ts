import * as fs from 'fs-extra';
import * as Handlebars from 'handlebars';
import * as Inflected from 'inflected';
import { parse } from 'path';
import { Config, TableConfig } from '../model/config';
import { HandlebarJson, HandlebarsColumn } from '../model/handlebar-json';
import { Template } from '../model/template';
import { FormatUtils } from '../utils/format.utils.ts';
import { PathUtils } from '../utils/path.utils';
import DB from './db';
import { Table } from '../model/table';
import { Column } from '../model/column';

export class Generator {
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }
    public async generate() {
        const db = new DB(this.config);
        const tables = await db.getDBData();
        tables.forEach(async table=>{
            const hdrData = await this.generateHdr(table);
            this.config.templates.map(async tpl => {
                const template = await this.readTemplate(tpl.tplFile);
                const render = Handlebars.compile(template);
                const handlebarFile = render(hdrData);
                await this.generateFile(tpl,handlebarFile,hdrData.table.tableName);
            });
        })
        this.handlebarHelper();
    }

    private async generateFile(tpl: Template,data:string,tableName:string) {
        const fileNamePrefix = tpl.fileNamePrefix? FormatUtils.toUpperCase(tpl.fileNamePrefix):""; 
        const fileNameSuffix = tpl.fileNameSuffix?FormatUtils.toUpperCase(tpl.fileNameSuffix):"";
        const fileName = fileNamePrefix + FormatUtils.toUpperCase(tableName) + fileNameSuffix + "."+tpl.fileType;
        const filePath = PathUtils.join(tpl.targetDirectory,fileName);
        try {
            this.write(filePath,data);
        } catch (error) {
            console.error("创建错误",error)
        }
        console.log(fileName+"生成成功");
    }

    private async write(filePath: string,data:string) {
        const path = parse(filePath);
        await this.createFolder(path.dir);
        await fs.outputFile(filePath,data);
    }

    private async createFolder(dirPath: string): Promise<boolean> {
        const isExist = await fs.pathExists(dirPath);
        if (isExist) {
            return false;
        }
        await fs.mkdirs(dirPath);
        return true;
    }

    async readTemplate(tplFileName: string): Promise<string> {
        const templateDir = PathUtils.join(PathUtils.getRootDir(), "templates",tplFileName);
        return await fs.readFile(templateDir, "utf8");
    }

    private async generateHdr(table:Table): Promise<HandlebarJson> {
        const hdr = new HandlebarJson();
        const  columns:Column[] = table.columns;
        // 包名,目录等配置
        hdr.prop = this.config.project;
        // 字段注视解析
        hdr.table.tableName = Inflected.classify(table.tableName);
        hdr.table.actualTableName = table.tableName;
        hdr.table.schema = table.tableSchema;
        hdr.table.catalog = table.tableCatalog;
        hdr.table.remarks = table.tableComment;

        const hdrColumns = new Array<HandlebarsColumn>();
        columns.map((column, index, array) => {
                const hdrColumn = new HandlebarsColumn();
                hdrColumn.actualColumnName = column.columnName;
                hdrColumn.columnDef = column.columnDefault;
                hdrColumn.columnName = Inflected.classify(column.columnName);
                hdrColumn.remarks = column.columnComment;
                hdrColumn.nullable = column.isNullable;
                hdrColumn.columnSize = column.characterMaximumLength;
                hdrColumn.charOctetLength = column.characterOctetLength;
                hdrColumn.typeName = column.dataType;
                hdrColumn.columnKey = column.columnKey;
                hdrColumns.push(hdrColumn);
        });
        hdr.table.allColumns = hdrColumns;
        // console.log(dbInfo);
        return hdr;
    }
    private handlebarHelper() {
        Handlebars.registerHelper({
            eq: (v1, v2) => {
                return v1 === v2;
            },
            ne: (v1, v2) => {
                return v1 !== v2;
            },
            lt: (v1, v2) => {
                return v1 < v2;
            },
            gt: (v1, v2) => {
                return v1 > v2;
            },
            lte: (v1, v2) => {
                return v1 <= v2;
            },
            gte: (v1, v2) => {
                return v1 >= v2;
            },
            and: () => {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).every(Boolean);
            },
            or: () => {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).some(Boolean);
            },
            inc: (v1) => {
                return parseInt(v1) + 1;
            },
            seq_contains: (v1: Array<string>, v2: string) => {
                v1.forEach(val => {
                    if (val == v2)
                        return true;
                })
                return false;
            }
        });
    }
}
