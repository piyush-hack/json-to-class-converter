
# JSON to Class Converter

This npm package provides functionality to convert JSON objects into their respective class instances. It leverages TypeScript decorators and a class registry to manage and instantiate classes dynamically based on JSON input.

## Features

- Register classes with a unique name.
- Convert JSON objects into instances of registered classes.
- Handle nested objects and arrays within JSON.

## Installation

To install the package, use npm:

```sh
npm install json-class-npm
```

## Usage

### Registering Classes

First, you need to register your classes using the `@RegisterClass` decorator.

```typescript
import { RegisterClass, parseJson } from 'json-class-npm';

@RegisterClass('C')
class C {
    constructor(public propC: string) {}

    getProp() {
        return "inside c " + this.propC;
    }
}

@RegisterClass('B')
class B {
    constructor(public propB: number) {}
}

@RegisterClass('A')
class A {
    constructor(public propA: string, public objB: B, public arrC: C[]) {}

    getA() {
        return this.propA;
    }

    getB() {
        console.log("objB");
    }
}
```

### Converting JSON to Class Instances

To convert JSON objects into instances of registered classes, use the `parseJson` function.

```typescript
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
console.log(objA.arrC[0].getProp()); // Output: inside c World
```

### Example

```typescript
import { RegisterClass, parseJson } from 'json-class-npm';

@RegisterClass('C')
class C {
    constructor(public propC: string) {}

    getProp() {
        return "inside c " + this.propC;
    }
}

@RegisterClass('B')
class B {
    constructor(public propB: number) {}
}

@RegisterClass('A')
class A {
    constructor(public propA: string, public objB: B, public arrC: C[]) {}

    getA() {
        return this.propA;
    }

    getB() {
        console.log("objB");
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
console.log(objA.arrC[0].getProp()); // Output: inside c World
```

## API

### `@RegisterClass(name: string)`

Decorator to register a class with a unique name.

- `name`: The unique name to register the class.

### `parseJson<T>(json: any): T`

Function to parse a JSON object and convert it into an instance of the registered class.

- `json`: The JSON object to parse.

## Reach Out

For more information, you can reach out to me through:

- [GitHub](https://github.com/piyush-hack/)
- [LinkedIn](https://www.linkedin.com/in/piyush-puniya-32b453227)

## License

This project is licensed under the MIT License.
