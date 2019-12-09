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
        const  hdrData = await this.generateHdr();
        this.config.templates.map(async val=>{
            const template =  await this.readTemplate(val);
            const render =  Handlebars.compile(template);
            const handlebarFile = render(hdrData);
        })
        this.handlebarHelper();
    }

    async createFolder(dirPath: string): Promise<boolean> {
        const isExist = await fs.pathExists(dirPath);
        if (isExist) {
            return false;
        }
        await fs.mkdirs(dirPath);
        return true;
    }

    creatFile(fileName: string) {

    }

    write(filePath: string, data: any) {
        const path = parse(filePath);
        this.createFolder(path.dir);
    }

    async readTemplate(template: Template): Promise<string> {
        const templateDir = PathUtils.join(PathUtils.getRootDir(), "templates", template.tplFile);
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
        hdr.table.tableNameLower = FormatUtils.toTileCase(hdr.table.tableName);
        hdr.table.tableNamePluralize = Inflected.pluralize(hdr.table.tableName);
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
            hdrColumn.columnNameLower = hdrColumn.columnName.toLocaleLowerCase();
            hdrColumn.columnNameUpper = FormatUtils.toUpperCase(hdrColumn.columnName);
            hdrColumn.remarks = column.columnComment;
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
                return v1 !== v2;
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
            }
        });
        // Handlebars.registerHelper('ifCond', function (v1, operator, v2, options: Handlebars.HelperOptions) {
        //     switch (operator) {
        //         case '==':
        //             return (v1 == v2) ? options.fn(this) : options.inverse(this);
        //         case '===':
        //             return (v1 === v2) ? options.fn(this) : options.inverse(this);
        //         case '!=':
        //             return (v1 != v2) ? options.fn(this) : options.inverse(this);
        //         case '!==':
        //             return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        //         case '<':
        //             return (v1 < v2) ? options.fn(this) : options.inverse(this);
        //         case '<=':
        //             return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        //         case '>':
        //             return (v1 > v2) ? options.fn(this) : options.inverse(this);
        //         case '>=':
        //             return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        //         case '&&':
        //             return (v1 && v2) ? options.fn(this) : options.inverse(this);
        //         case '||':
        //             return (v1 || v2) ? options.fn(this) : options.inverse(this);
        //         default:
        //             return options.inverse(this);
        //     }
        // });
    }
}
