import { IClassInstantiator, IJsonParser } from "../interfaces";
export declare class JsonParser implements IJsonParser {
    private instantiator;
    constructor(instantiator: IClassInstantiator);
    parse<T>(json: any): T;
}
