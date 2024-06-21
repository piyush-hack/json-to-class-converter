import { IClassInstantiator, IJsonParser } from "../interfaces";

export class JsonParser implements IJsonParser {
    constructor(private instantiator: IClassInstantiator) { }

    parse<T>(json: any): T {
        return this.instantiator.instantiate(json);
    }
}
