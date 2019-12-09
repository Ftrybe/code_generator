import DBUtils from "./core/db";
import { Column } from "./model/column";
import { plainToClass } from "class-transformer";
import { Generator } from "./core/generator";
import { ConfigParse } from "./core/config-parse";
export default class service {
  constructor() { }
  public start() {
    const configParse: ConfigParse = new ConfigParse();
    const config = configParse.getConfig("config1.json");
    
    const generator: Generator = new Generator(config);
    generator.generate();

  }
}