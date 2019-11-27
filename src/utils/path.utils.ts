import * as path from "path";

export class PathUtils {
    private constructor() { }

    public static getRootDir(): string {
        return path.join(__dirname, '../');
    }
}