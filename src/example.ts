import { RegisterClass, parseJson } from "json-class-npm";

@RegisterClass('C')
class C {

    constructor(
        public propC: string
    ) {

    }

    getProp() {
        return "inside c " + this.propC
    }
}

@RegisterClass('B')
class B {
    constructor(
        public propB: number
    ) {

    }
}

@RegisterClass('A')
class A {
    constructor(
        public propA: string,
        public objB: B,
        public arrC: C[]
    ) {

    }

    getA() {
        return this.propA
    }

    getB() {
        console.log("objB")
    }
}

// Example usage
const jsonString = {
    __class: 'A',
    propA: 'Hello',
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
console.log(objA.arrC[0].getProp())

