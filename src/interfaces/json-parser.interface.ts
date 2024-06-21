export interface IJsonParser {
    parse<T>(json: any): T;
}