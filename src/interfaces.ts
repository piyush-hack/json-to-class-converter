export interface IJsonParser {
    parse<T>(json: any): T;
}

export interface IClassInstantiator {
    instantiate(json: any): any;
}

export class PrimitiveChecker {
    isPrimitive(val: any): boolean {
        return (val !== Object(val));
    }
}
