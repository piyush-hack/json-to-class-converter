import { IClassRegistry } from "../interfaces";

export class ClassRegistry implements IClassRegistry {
    private static classes: { [key: string]: any } = {};
    private static _classRegistry: ClassRegistry

    private constructor() { }

    registerClass(name: string, cls: any) {
        ClassRegistry.classes[name] = cls;
    }

    getClass(name: string) {
        return ClassRegistry.classes[name];
    }

    static getRegister() {
        if (!this._classRegistry) {
            this._classRegistry = new ClassRegistry()
        }
        return this._classRegistry;
    }
}

export function RegisterClass(name: string) {
    return function (constructor: Function) {
        const register = ClassRegistry.getRegister();
        register.registerClass(name, constructor);

        const original = constructor.prototype.constructor;
        constructor.prototype.constructor = function (...args: any[]) {
            this.__class = name;
            original.apply(this, args);
        }
    };
}
