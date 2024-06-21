import { ClassRegistry } from './class-registry';
import { IJsonParser, IClassInstantiator, PrimitiveChecker } from './interfaces';

class JsonParser implements IJsonParser {
    constructor(private instantiator: IClassInstantiator, private primitiveChecker: PrimitiveChecker) {}

    parse<T>(json: any): T {
        return this.instantiator.instantiate(json);
    }
}

class ClassInstantiator implements IClassInstantiator {
    constructor(private primitiveChecker: PrimitiveChecker) {}

    instantiate(json: any): any {
        if (this.primitiveChecker.isPrimitive(json) || !json?.__class) {
            return json;
        } else {
            const clazz = ClassRegistry.getClass(json.__class);
            const instance = new clazz();
            for (const key in json) {
                if (!json.hasOwnProperty(key)) continue;
                const value = json[key];
                if (this.primitiveChecker.isPrimitive(value)) {
                    instance[key] = value;
                } else if (Array.isArray(value)) {
                    instance[key] = value.map((item: any) => this.instantiate(item));
                } else if (typeof value === 'object') {
                    instance[key] = this.instantiate(value);
                } else {
                    instance[key] = value;
                }
            }
            return instance;
        }
    }
}

export function parseJson<T>(json: any): T {
    const primitiveChecker = new PrimitiveChecker();
    const instantiator = new ClassInstantiator(primitiveChecker);
    const parser = new JsonParser(instantiator, primitiveChecker);
    return parser.parse<T>(json);
}
