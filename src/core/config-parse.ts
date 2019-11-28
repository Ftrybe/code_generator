import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import * as path from "path";
import { Config } from '../model/config';
import { PathUtils } from '../utils/path.utils';
export class ConfigParse {
    private config: Config = new Config();
    constructor() { }
    public getConfig(configName: string): Config {

        const rootDir = PathUtils.getRootDir();
        const configPath = path.join(rootDir, "config", configName);

        const data = fs.readFileSync(configPath, 'utf-8');
        const json = JSON.parse(data);
        this.config = plainToClass(Config, json);
        return this.config;
    }
}
