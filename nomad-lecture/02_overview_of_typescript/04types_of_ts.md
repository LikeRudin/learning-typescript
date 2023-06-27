# contents

1. unknown

2. void: function returns nothing

3. never: use for un-excuted type

### notice

the main goal of good-usage for typescript is succefully communicate with type-checker

give type to where type-checker cannot infer proper one

# 1. unknown

### usage

use to define variable or params
when you cannot certain what type of value will given

- if declare variable as unknown type, typescipt editor forces us to check the type

```
let a: unknown = 7;

4 + a

// editor error message
'a' is of type 'unknown'
```

handle error

```
let a: unknown = 7;

if (typeof a === 'number') {
    a + 4
}
```

<br>

# 2. void

### usage

not for decralation

- function without return value automatically binding with void type

# 3. never

### usage

declare function which should never return something

```
function hello (param:string): never {
    return param

}

// editor error message

Type 'string' is not assignable to type 'never'.
```

should have non-reachable endpoint

```
function hello ():never{
    throw new Error("cannot reach")
}
```

Error

```
function hello (param: string|number):never{
    if(typeof param === "string"){
        console.log("string");
    }
    else if(typeof param === "number") {
        console.log("number");
    }
}

editor error message

A function returning 'never' cannot have a reachable end point.
```

Usage

```
function hello (param:string|number) {
    switch (typeof(param)) {
        case "number":
        console.log("number");
        break;
        case "string":
        console.log("string");
        break;
        default: {
            const paramCheck: never = param;
            throw new Error("not reachable");
            }
    }}
```

auto-binding

```
function hello (param: string|number) {
    if(typeof param === "string"){
        console.log("string");
    }
    else if(typeof param === "number") {
        console.log("number");
    }
    else {
        param // this param be a never type
        throw new Error("cannot reach");
    }
}
```
