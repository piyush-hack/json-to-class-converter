import { ClassInstantiator, ClassRegistry, JsonParser } from './class-handlers';
import { IClassInstantiator, IClassRegistry, IJsonParser } from './interfaces';

export function parseJson<T>(json: any): T {
    const classRegister: IClassRegistry = ClassRegistry.getRegister();
    const instantiator: IClassInstantiator = new ClassInstantiator(classRegister);
    const parser: IJsonParser = new JsonParser(instantiator);
    return parser.parse<T>(json);
}
