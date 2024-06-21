import { IClassRegistry } from "../interfaces";
export declare class ClassRegistry implements IClassRegistry {
    private static classes;
    private static _classRegistry;
    private constructor();
    registerClass(name: string, cls: any): void;
    getClass(name: string): any;
    static getRegister(): ClassRegistry;
}
export declare function RegisterClass(name: string): (constructor: Function) => void;
