import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import * as path from "path";
import { Config } from '../model/config';
import { PathUtils } from '../utils/path.utils';
import * as handlebars from 'handlebars';
import { throws } from 'assert';
export class ConfigParse {
    private config: Config = new Config();
    constructor() { 
        console.log("准备开始获取配置信息");
    }
    public getConfig(configName: string): Config {
        const srcDir = PathUtils.getScrDir();
        const configPath = path.join(srcDir, "config", configName);
        const data = fs.readFileSync(configPath, 'utf-8');
        const hbr =  handlebars.compile(data,{noEscape:true});
        const json = JSON.parse(data);
        const render = hbr(json);
        const renderJson = JSON.parse(render);
        this.config =  plainToClass(Config,renderJson);
        return this.config;
    }

    
}
