# contents

1. tsconfig.json

2. include

3. compilerOtion - outDir, target, lib

## 1. tsconfig.json

setting file for typescript compiler and editor

we can set level of strict,
version for compiled javascript files,
path to save js file

and many other options

## 2. include

it specifies path to ts file to compile

```
{
    "include": [],
    "compilerOption": {

    }
}
```

## 3. compilerOtion - outDir, target, lib

<br>

```
"compilerOption": {
    "outDir": [],
    "target" : "ES5",
    "lib" : ["ES6", "DOM"]
}
```

### outDir

<br>

path for saving compiled javascript code.

<br>

### target

<br>

javascript version to compile

<br>

### lib

<br>

it specifies enviorment for typescript
to provide type definition and comment
