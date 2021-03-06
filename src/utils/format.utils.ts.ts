export class FormatUtils {
        private constructor(){}
    
        public static toCamelCase(input: string) {
            return input.replace(/_([a-z])/ig, (all, letter) => letter.toUpperCase());
        }
    
        public static toTileCase(input: string) {
            return input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }
    
        public static toUpperCase(input: string) {
            return this.toCamelCase(input.charAt(0).toUpperCase() + input.slice(1));
        }
        
        public static toHyphensCase(input: string) {
            return input.charAt(0).toLowerCase() + input.substr(1).replace(/[A-Z]+/g, txt => "-" + txt).toLowerCase();
        }
        public static toLocaleCase(input:string){
            return input.substring(0, 1).toLocaleLowerCase() + input.substring(1)
        }
}
