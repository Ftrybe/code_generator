import { Generator } from "./core/generator";
import { ConfigParse } from "./core/config-parse";
export default class service {
  constructor() { }
  public start() {
    const configParse: ConfigParse = new ConfigParse();
    const config = configParse.getConfig("msi.json");
    
    const generator: Generator = new Generator(config);
    generator.generate();

  }
}