# content

1. Optional Property: `?`

2. Type Alias: `type`

3. Type for Function Signature: `param, return`

<br>

### notice

type alias use `=`

<br>

# 1. optional property

<br>

by using `?`, we can give optinal property
to subtype for object

```
const player = {
    name: string,
    age?: number
} = {
    name: "hong-gil-dong",
    age:7
};
```

## Editor's undestanding

<br>

transcode type of optional property as `| undefined`

```
{age?: number} => {age: number | undefined}

```

direct use of `player.age` trigger error message

```
if (player.age < 10)

// 'player.age' is possibly 'undefined'

```

how to handle

```
if (player.age && player.age < 10)
```

<br>

# 2. Type Alias

we can declare custom type by using `type` keyword

- it can be used just as typescript built-in type

```
type Player = {
    name:string
    age?: number
}

const student: Player = {
    name: "hong",
}
```

<br>

# 3. Types for Function Signature

give type to function params and after of param()

```
type Return = string;

const myFunction = function (param: string): Return {
    console.log(param)
    return "hello"
}
```

<br>
