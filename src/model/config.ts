import { ConnectionConfig } from 'mysql';
import { Template } from "./template";

export class Config {
    // myslq配置
    mysql: ConnectionConfig;
    // 项目基础配置
    project: ProjectConfig;
    // 渲染模板配置
    templates: Template[];
    // 表配置
    table: TableConfig;
}
export class ProjectConfig {
    //目标根项目路径
    targetProjectDirectory: string;
    // java文件夹基础路径
    baseTargetJavaDirectory: string;
    // resources文件夹基础路径
    baseTargetResourcesDirectory: string;
    // mybatis xml文件存放路径
    mapperXmlResourcesDirectory: string;
    // 包名
    packageName: string;
    // 包名对应目录
    javaDirectory: string;
    // BaseEntity的包名
    baseEntityPackageName: string;
    // BaseMapper的包名
    baseMapperPackageName: string;
    // BaseService的包名
    baseServicePackageName: string;
    // BaseServiceImpl的包名
    baseServiceImplPackageName: string;
    // 实体的包名
    entityPackageName: string;
    // mapper的包名
    mapperPackageName: string;
    // service的包名
    servicePackageName: string;
    // serviceImpl的包名
    serviceImplPackageName: string;
    // controller的包名
    controllerPackageName: string;
}
export class TableConfig {
    schema: string;
    forceBigDecimals: string;
    containsView: string;
    exclude: string;
    include: string;
}