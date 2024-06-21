import { RegisterClass, parseJson } from '../index';

@RegisterClass('C')
class C {
    constructor(public propC: string) { }

    getProp() {
        return this.propC;
    }
}

@RegisterClass('B')
class B {
    constructor(public propB: number) { }
}

@RegisterClass('A')
class A {
    constructor(public propA: string, public objB: B, public arrC: C[]) { }

    getA() {
        return this.propA;
    }

    getB() {
        return this.objB;
    }
}

describe('JSON to Class Converter', () => {
    it('should correctly register classes', () => {
        expect(() => new A('test', new B(1), [new C('test')])).not.toThrow();
    });

    it('should parse JSON to class instance', () => {
        const jsonString = {
            __class: 'A',
            propA: 'Hello',
            propB: 'Hello2',
            objB: {
                __class: 'B',
                propB: 42
            },
            arrC: [
                {
                    __class: 'C',
                    propC: 'World'
                },
                {
                    __class: 'C',
                    propC: '!'
                }
            ]
        };

        const objA: A = parseJson(jsonString);
        expect(objA).toBeInstanceOf(A);
        expect(objA.propA).toBe('Hello');
        expect((objA as any).propB).toBeUndefined();
        expect(objA.getA()).toBe(jsonString.propA);
        expect(objA.getB()).toBe(objA.objB);

        expect(objA.objB).toBeInstanceOf(B);
        expect(objA.objB.propB).toBe(42);
        expect(objA.arrC.length).toBe(2);
        expect(objA.arrC[0]).toBeInstanceOf(C);
        expect(objA.arrC[0].propC).toBe('World');
        expect(objA.arrC[1].propC).toBe('!');
        expect(objA.arrC[1].getProp()).toBe('!');
    });

    it('should handle nested objects correctly', () => {
        const jsonString = {
            __class: 'A',
            propA: 'Nested',
            objB: {
                __class: 'B',
                propB: 21
            },
            arrC: []
        };

        const objA: A = parseJson(jsonString);
        expect(objA.objB).toBeInstanceOf(B);
        expect(objA.objB.propB).toBe(21);
    });

    it('should handle arrays of class instances correctly', () => {
        const jsonString = {
            __class: 'A',
            propA: 'ArrayTest',
            objB: {
                __class: 'B',
                propB: 15
            },
            arrC: [
                {
                    __class: 'C',
                    propC: 'Item1'
                },
                {
                    __class: 'C',
                    propC: 'Item2'
                }
            ]
        };

        const objA: A = parseJson(jsonString);
        expect(objA.arrC.length).toBe(2);
        expect(objA.arrC[0].propC).toBe('Item1');
        expect(objA.arrC[1].propC).toBe('Item2');
    });

    it('should return same json for missing class names', () => {
        const jsonString = {
            __class: 'Unknown',
            propA: 'Test'
        };

        expect(parseJson(jsonString)).toEqual(jsonString);

        const jsonString2 = {
            propA: 'Test'
        };

        expect(parseJson(jsonString2)).toEqual(jsonString2);
    });

    it('should not do anything for not object datatype', () => {
        const data = "a"
        const booleandata = true;
        const stringArray = ["a", "b", "c", "d"];


        expect(parseJson(data)).toBe(data);
        expect(parseJson(booleandata)).toBe(booleandata);
        expect(parseJson(stringArray)).toBe(stringArray);
    });
});
