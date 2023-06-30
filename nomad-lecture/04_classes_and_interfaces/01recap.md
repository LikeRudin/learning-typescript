# contents

<br>

1. type for property of object: "key: value" pair

2. code example : making dictionary class

<br>

## 1. type for property: "key: value"

<br>

type for property of object

```
    type Pair = {
        [keyName: type]: type
    }
```

by giving above type to object, we can create typed object

```

type Pair = {
    [keyName: number]: string
}

// declare property as string: string pair
const typedObj: Pair = {
    "hi": "hello",
}

error message on editor

/* Type '{ hi: string; }' is not assignable to type 'Pair'.
 * Object literal may only specify known properties,
 *  and '"hi"' does not exist in type 'Pair'.(2322)
 */
```

<br>

## 2. code example : making dictionary class

<br>

```
type Words = {
    [key:string]: string,
}

class Dictionary {
    constructor(private words: Words = {}){

    }

    add(term: string, def: string){
        if (this.words[term] === undefined) {
        this.words[term] = def;
        console.log(`${term}:${def} is succefully added on ${JSON.stringify(this)}`);
        return `${term}: ${def}`;
        }
        console.log(`${term} is already defined`);
        return `${term}: ${def}`;

    }

    getDef(term: string) {
        console.log(`input: ${term} def: ${this.words[term]}`);
        return this.words[term];
    }


}

const myDict = new Dictionary();

myDict.add("TS", "super set of JS");

myDict.getDef("TS")
```
