export declare class ClassRegistry {
    private static classes;
    static registerClass(name: string, cls: any): void;
    static getClass(name: string): any;
}
export declare function RegisterClass(name: string): (constructor: Function) => void;
