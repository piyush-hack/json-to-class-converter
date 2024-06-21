import { IClassInstantiator, IClassRegistry } from "../interfaces";

export class ClassInstantiator implements IClassInstantiator {
    constructor(
        private classRegistry: IClassRegistry
    ) { }

    instantiate(json: any): any {
        let response = null;
        if (this.isPrimitive(json) || Array.isArray(json) || !json?.__class) {
            response = json;
        } else {
            const clazz = this.classRegistry.getClass(json.__class);
            if (!clazz) {
                response = json;
            } else {
                const instance = new clazz();
                this.assignProperties(instance, json);
                response = instance;
            }
        }
        return response;
    }

    private assignProperties(instance: any, json: any): void {
        for (const key in json) {
            if (!json.hasOwnProperty(key) || !(key in instance)) continue;
            const value = json[key];
            instance[key] = this.resolveValue(value);
        }
    }

    private resolveValue(value: any): any {
        let response = null;
        if (this.isPrimitive(value)) {
            response = value;
        } else if (Array.isArray(value)) {
            response = value.map((item: any) => this.instantiate(item));
        } else if (typeof value === 'object') {
            response = this.instantiate(value);
        }
        return response;
    }

    
    private isPrimitive(val: any): boolean {
        return (val !== Object(val));
    }
}