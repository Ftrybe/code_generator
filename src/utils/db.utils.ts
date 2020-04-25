export class DbUtils {
    private constructor() { }

    public static convertJavaType(type: string, len: number) {
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
            case "tinyint":
            case "boolean":
                return "java.lang.Boolean";
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
                return len > 19 ? "java.math.BigDecimal" : "java.lang.Long";
            case "date":
            case "year":
            case "datetime":
                return "java.util.Date";
            case "time":
                return "java.sql.Time";
            case "timestamp":
                return "java.sql.Timestamp";
        }
    }

    public static SqlType2JdbcType(type: string) {
        type = type.toLocaleUpperCase();
        switch (type) {
            case "DATETIME":
                return "TIMESTAMP";
            case "INT":
                return "INTEGER";
            default:
                return type;
        }
    }
    public static convertShortJavaType(type: string, len: number) {
        const javaType = this.convertJavaType(type, len);
        const shortName = javaType.substring(javaType.lastIndexOf(".") + 1);
        return shortName;
    }

}