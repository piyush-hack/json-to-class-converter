export class ClassRegistry {
    private static classes: { [key: string]: any } = {};

    static registerClass(name: string, cls: any) {
        this.classes[name] = cls;
    }

    static getClass(name: string) {
        return this.classes[name];
    }
}

export function RegisterClass(name: string) {
    return function (constructor: Function) {
        ClassRegistry.registerClass(name, constructor);
        // Add __class property to instances
        const original = constructor.prototype.constructor;
        constructor.prototype.constructor = function(...args: any[]) {
            this.__class = name;
            original.apply(this, args);
        }
    };
}
