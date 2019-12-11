export class DbUtils {
    private constructor() { }

    public static convertJavaType(type: string) {
        type = type.toLocaleLowerCase();
        switch (type) {
            case "varchar":
            case "char":
            case "text":
                return "java.lang.String";
            case "blob":
                return "java.lang.byte[]";
            case "integer":
            case "int":
            case "id":
                return "java.lang.Long";
            case "tinynt":
            case "boolean":
            case "smallint":
            case "mediumint":
                return "java.lang.Integer";
            case "bit":
                return "Boolean";
            case "bigint":
                return "java.math.BigInteger";
            case "float":
                return "java.lang.Float";
            case "double":
                return "java.lang.Double";
            case "decimal":
                return "java.math.BigDecimal";
            case "date":
            case "year":
                return "java.sql.Date";
            case "time":
                return "java.sql.Time";
            case "datetime":
            case "timestamp":
                return "java.sql.Timestamp"
        }
    }

    public static convertShortJavaType(type: string) {
        const javaType = this.convertJavaType(type);
        const shortName =  javaType.substring(javaType.lastIndexOf(".")+1);
        return shortName;
    }
}