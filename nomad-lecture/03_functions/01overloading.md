# contents

1. function overloading

2. example

   - case A: parameter can have different types

   - case B: function can have different number of parameters

<br>

## 1. function overloading

way to implement polymorphism at function

<br>

## 2. example

### case A: parameter can have different types

<br>

in nest js, `Router.push` method recieve path as `string` or `object`

```
Router.push("/home");

Router.push({
    path: "/home",
    state: {

    }
})
```

many functions like `push` on above having function overloading functionality

exercise

```
type configObject: {

}

type config = {
    path: string,
    state: configObject
}

type Push = {
    (path: string): void,
    (path: config): void
}

const push: Push = (config) => {
    if (typeof config === "string") {

    }
    else {
        //handle when path has type 'config'
    }

}
```

<br>

### case B. function have different number of params

<br>

in this case, param should be considered as optional param
which other call signature don't have

```
type exampleType = {
    (a:number, b:number): number,
    (a:number, b:number, c:number): number
}

const example: exampleType = (x, y, c?:number) {
    if (c) return x + y + c;
    else return x + y;
}
```
