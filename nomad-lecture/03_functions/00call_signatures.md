# contents

call signature: type for functions

<br>

## reason to use

1. we can declare type of function

   - can create blue prints for functions

2. giving a type at function can save time

   - don't need to give types for each function's param and return

<br>

## example

```
type ArithmeticOperation = (a:number, b:number) => number;


const add:ArithmeticOperation = (x, y) => x + y;

const subtract: ArithmeticOperation = (c, d) => c - d;

const multiple: ArithmeticOperation = (e, f) => e * f;

const divide: ArithmeticOperation = (g, h) => g / h;

```
