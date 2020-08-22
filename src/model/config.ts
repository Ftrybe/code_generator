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

    generate: GenerateConfig;
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
     // 数值类型是否强制转为BigDecimal
    forceBigDecimals: string;
    // 是否包含数据库的视图
    containsView: string;
    // 排除表名（当设置了include时，讲排除include中的表）
    exclude: string;
    // 包含表名
    include: string;
}
export class GenerateConfig{
    // 需要生产的模版文件
    include: string;
    // 排除模版文件
    exclude: string;
    // 是否开启过滤（设置true，才可以使用include和exclude属性）
    filter: boolean;
    // 是否覆盖已有文件
    overwrite: boolean;
}