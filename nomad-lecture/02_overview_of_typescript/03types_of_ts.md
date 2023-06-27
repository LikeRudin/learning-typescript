# constents

1. readonly Modifier: `readonly`

2. Tuple: `specific array`

3. undefined, null

4. `any`: escape from typescript paradigm

<br>

# 1. readonly Modifier

<br>

### functionality

block assign another value at variable
after first initialization.

- it is only for array and tuple

```
'readonly' type modifier is only permitted
 on array and tuple literal types.(1354)
```

<br>

### array

```
const a: readonly string[] = ["1"];
```

### tuple

```
const a: readonly [string, number]= ["1", 1];
```

<br>

# 2. tuple

<br>

array has fixed length and order of types of element

```
type MyTuple = [string, number]

array having type MyTuple must have 2 elements

first element has string type
second has number type
```

<br>

# 3. undefined, null

<br>

we can assign `undefined` and `null` types to data

```
const a: undefined = undefined;

const b: null = null

```

<br>

# 4. any

<br>

escaping tool from typescript paradigm

if variable has type `any`,
then literally can assign any types to that

=> lose any protection provided by typescript

<br>

even `any[]` type is too

```
const a: any[] = [1,2,3];

const b: any = 7;

console.log(a + b);

[LOG]: "1,2,37"
```
