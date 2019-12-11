import * as fs from 'fs-extra';
import * as Handlebars from 'handlebars';
import * as Inflected from 'inflected';
import { parse } from 'path';

import { Config } from '../model/config';
import { HandlebarJson, HandlebarsColumn } from '../model/handlebar-json';
import { Template } from '../model/template';
import { FormatUtils } from '../utils/format.utils.ts';
import { PathUtils } from '../utils/path.utils';
import DB from './db';

export class Generator {
    config: Config;
    constructor(config: Config) {
        this.config = config;

    }
    public async generate() {
        const hdrData = await this.generateHdr();
        this.config.templates.map(async tpl => {
            const template = await this.readTemplate(tpl.tplFile);
            const render = Handlebars.compile(template);
            const handlebarFile = render(hdrData);
            await this.generateFile(tpl,handlebarFile,hdrData.table.tableName);
        })
        this.handlebarHelper();
    }

    private async createFolder(dirPath: string): Promise<boolean> {
        const isExist = await fs.pathExists(dirPath);
        if (isExist) {
            return false;
        }
        await fs.mkdirs(dirPath);
        return true;
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
        // await fs.createFile(filePath);
        await fs.outputFile(filePath,data);
    }

    async readTemplate(tplFileName: string): Promise<string> {
        const templateDir = PathUtils.join(PathUtils.getRootDir(), "templates",tplFileName);
        return await fs.readFile(templateDir, "utf8");
    }

    private async generateHdr(): Promise<HandlebarJson> {
        const db = new DB(this.config);
        const dbInfo = await db.getDBData();
        const hdr = new HandlebarJson();
        // 包名,目录等配置
        hdr.prop = this.config.project;
        // 字段注视解析
        const table = dbInfo.tables[0];
        hdr.table.tableName = Inflected.classify(table.tableName);
        hdr.table.actualTableName = table.tableName;
        hdr.table.schema = table.tableSchema;
        hdr.table.catalog = table.tableCatalog;
        hdr.table.remarks = table.tableComment;

        const columns = dbInfo.columns;
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
