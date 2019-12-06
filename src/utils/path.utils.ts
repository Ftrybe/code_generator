import * as path from "path";

export class PathUtils {
    private constructor() { }

    public static getRootDir(): string {
        return path.join(__dirname, '../../');
    } 
     public static getScrDir(): string {
        return path.join(__dirname, '../');
    }

    public static join(...paths:string[]):string{
        return path.join(...paths);
    }
}