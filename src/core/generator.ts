import { Config } from "../model/config";
import DB from "./db";

export class Generator {
    config:Config;
    constructor(config:Config){
        this.config = config;
    }
    public generate(){
        const db= new DB(this.config);
        db.getTableInfo();
        
    }   
}
