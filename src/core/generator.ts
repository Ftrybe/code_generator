import { Config } from "../model/config";
import DB from "./db";
import * as fs from "fs-extra";
import { parse } from "path";
import { PathUtils } from "../utils/path.utils";
import { Template } from "../model/template";
import { HandlebarJson } from "../model/handlebar-json";
import * as Handlebars from "handlebars";
export class Generator {
    config: Config;
    constructor(config: Config) {
        this.config = config;
    }
    public async generate() {
        const db = new DB(this.config);
        const dbinfo = await db.getDBData();
        const  hdr = new HandlebarJson();
        hdr.prop.baseEntityPackageName = this.config.project.baseEntityPackageName;
        const a = Handlebars.compile(await this.readTemplate(this.config.templates[0]))
        console.log(a(hdr));

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
}
