export class Templates {
    // 如果文件存在是否重写
    overwrite:boolean;
    // 如果存放的目录不存在是否创建
    markDirIfNotExists:boolean;
    // 模板文件的存放路径
    tplDirectory:string;
    // 模板文件
    templates: Templates[];
}
