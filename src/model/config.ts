import { ConnectionConfig } from 'mysql';
import { Template } from "./template";

export class Config {
    mysql: ConnectionConfig;
    project: ProjectConfig;
    templates: Template[];
    table: TableConfig;
}
export class ProjectConfig {
    targetProjectDirectory: string;
    baseTargetJavaDirectory: string;
    baseTargetResourcesDirectory: string;
    mapperXmlResourcesDirectory: string;
    packageName: string;
    javaDirectory: string;
    baseEntityPackageName: string;
    baseMapperPackageName: string;
    baseServicePackageName: string;
    baseServiceImplPackageName: string;
    entityPackageName: string;
    mapperPackageName: string;
    servicePackageName: string;
    serviceImplPackageName: string;
    controllerPackageName: string;
}
export class TableConfig {
    schema: string;
    forceBigDecimals: string;
    containsView: string;
    exclude: string;
    include: string;
}