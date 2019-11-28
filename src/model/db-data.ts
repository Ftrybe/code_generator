import { Table } from "./table";
import { Column, Columns } from "./column";

export class DbData {
    tables:Table[] = new Array<Table>();
    columns:Column[] = new Array<Column>();
}
