import { IClassInstantiator, IClassRegistry } from "../interfaces";
export declare class ClassInstantiator implements IClassInstantiator {
    private classRegistry;
    constructor(classRegistry: IClassRegistry);
    instantiate(json: any): any;
    private assignProperties;
    private resolveValue;
    private isPrimitive;
}
