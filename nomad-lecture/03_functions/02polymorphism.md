# contents

1. definition of polymorphism

2. generic

<br>

## 1. definition of polymorphism

<br>

### root words

<br>

poly: multi-

morpho: form, structure

<br>

### polymorphism

<br>

state has different forms with one-name

<br>

## 2. generics

<br>

### reason to use generic

to evade the repeating the declare types.

by using generics, we can define various types of call siganature with one line

<br>

### example code

<br>

function takes single-type array

```
type HandleArray = {
    (arr: number[]): void,
    (arr: boolean[]): void,
}

const handleArray: HandleArray = (arr) => {
    arr.forEach(element => console.log(element));
}

handleArray([1, 2, 3]);

handleArray([true, false]);


// this throw error message on editor
handleArray(["1", "2", "3"]);
```

if we want to create function for specific type of array,

we must manually append concrete-type call siganture at type HandleArray

it is waste of labor and time

generic is simple way to implement polymorphism of function

<br>

example code: generics automatically made types for each call

```
type HandleArray = {
    <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder
}

const handleArray: HandleArray = (arr) => arr[0]

const a = handleArray([1, 2, 3, 4]);
//const a: number
//const handleArray: <number>(arr: number[]) => number


const b = handleArray(["1", 2 , true, false]);
//const b: string | number | boolean
//const handleArray: <string | number | boolean>(arr: (string | number | boolean)[]) => string | number | boolean

const c = handleArray([true, "a", 1, 2]);
//const handleArray: <string | number | boolean>(arr: (string | number | boolean)[]) => string | number | boolean
//const c: string | number | boolean

const d = handleArray([null, 1, 2, 3]);
//const handleArray: <number | null>(arr: (number | null)[]) => number | null
//const d: number | null


const e = handleArray([undefined, 1, 2, 3]);
//const handleArray: <number | undefined>(arr: (number | undefined)[]) => number | undefined
//const e: number | undefined

```
