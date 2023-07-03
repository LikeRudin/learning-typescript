# contents

1. various usages of type

2. interface

## 1. various usage of type

### A. type alias

give another name to `built-in type` or `pre-defined type`

- example for type aliasing

```
type Description = string;

const text: Description = "this is a study log about typescript";

```

### B. specify sturcture for object

```
type ClassMate = {
    name: string,
    givenNumber: number
}

const student: ClassMate = {
    name: "kill-dong",
    givenNumber: 33,
}
```

### C. Union of concrete types

`concrete type`: specific value as type

```
type PersonalColor = "tomato" | "teal";

const myColor: PersonalColor = "tomato";

```

# 2. interface

used for `specifying structure object`

- interface declaration doesn't have `=`

```
interface ClassMate {
    name: string,
    givenNumber: number
}
```

### interface can extends types and interface

```
type ClassMate = {
    name: string,
    givenNumber: number
}

interface MathClassMate extends ClassMate  {
    score: number
}
```

### interface can accumulate property

by duplication of declaration

- interface allow multi-declaration!

```
interface ClassMate {
    name: string
}

interface ClassMate {
    givenNumber: number
}


```

above codes are same with below codes

```
interface ClassMate {
    name: string
    givenNumber: number
}
```
