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
        tables.forEach(async table => {
            const hdrData = await this.generateHdr(table);
            this.config.templates.map(async tpl => {
                const template = await this.readTemplate(tpl.tplFile);
                const render = Handlebars.compile(template);
                const handlebarFile = render(hdrData);
                if(this.config.generate.filter){
                    if (this.config.generate.include?.includes(tpl.tplFile) && !this.config.generate.exclude?.includes(tpl.tplFile)) {
                        await this.generateFile(tpl, handlebarFile, hdrData.table.tableName);
                    }
                }else{
                    await this.generateFile(tpl, handlebarFile, hdrData.table.tableName);
                }
            });
        })
        this.handlebarHelper();
    }

    private async generateFile(tpl: Template, data: string, tableName: string) {
        const fileNamePrefix = tpl.fileNamePrefix ? FormatUtils.toUpperCase(tpl.fileNamePrefix) : "";
        const fileNameSuffix = tpl.fileNameSuffix ? FormatUtils.toUpperCase(tpl.fileNameSuffix) : "";
        const fileName = fileNamePrefix + FormatUtils.toUpperCase(tableName) + fileNameSuffix + "." + tpl.fileType;
        const filePath = PathUtils.join(tpl.targetDirectory, fileName);
        try {
            this.write(filePath, data);
        } catch (error) {
            console.error("创建错误", error)
        }
    }

    private async write(filePath: string, data: string) {
        const path = parse(filePath);
        try {
            await this.createFolder(path.dir);
            if(!this.config.generate.overwrite){
                if(fs.existsSync(filePath)){
                    console.log("已关闭页面重复写入，跳过路径", filePath,"的文件写入");
                    return;
                }
            }
            await fs.outputFile(filePath, data);
            console.log("文件创建成功，路径为", filePath);
        } catch (error) {
            console.error(error);
        }

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
        const templateDir = PathUtils.join(PathUtils.getRootDir(), "templates", tplFileName);
        return await fs.readFile(templateDir, "utf8");
    }

    private async generateHdr(table: Table): Promise<HandlebarJson> {
        const hdr = new HandlebarJson();
        const columns: Column[] = table.columns;
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
        return hdr;
    }
    private handlebarHelper() {
        Handlebars.registerHelper({
            eq: function (v1, v2) {
                return v1 === v2;
            },
            ne: function (v1, v2) {
                return v1 != v2;
            },
            lt: function (v1, v2) {
                return v1 < v2;
            },
            gt: function (v1, v2) {
                return v1 > v2;
            },
            lte: function (v1, v2) {
                return v1 <= v2;
            },
            gte: function (v1, v2) {
                return v1 >= v2;
            },
            and: function () {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).every(Boolean);
            },
            or: function () {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).some(Boolean);
            },
            inc: function (v1) {
                return parseInt(v1) + 1;
            },
            seq_contains: function (v1: Array<string>, v2: string) {
                v1.forEach(val => {
                    if (val == v2)
                        return true;
                })
                return false;
            }
        });
    }
}
