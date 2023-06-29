# contents

1. create generics

2. use generics

## 1. create generics

generics creation is useful to make code for some libraries, packages code

but normal developer - who usually don't create libraries ,but use

## 2. use generics

we can replace this code as one-line function

```
//type handleArray = <T>(a: T[]) => T;

type HandleArray = {
    <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder
}

const handleArray: HandleArray = (arr) => arr[0] ;
```

by giving generic at function

```

// i don't know the reason why , is needed in bracket.
const handleArray = <T,>(a: T[]) => a[0];

const a = handleArray([1, 2, 3]);

//we can give generic-type on function call
//to check the proper arguments are given

const b = handleArray<number>([1,2]);

const c = handleArray<boolean>([1, 2])
```

<br>

### giving generic type to property

```

// declare root type
type Player<E> = {
    name: string,
    extraInfo: E
}

// declare child type
type FoodFighter = Player<{ favFood: string }>

// declare actual instance
const nico: FoodFighter = {
    name: "nico",
    extraInfo: {
        favFood: "tomato"
    }
}

// we can seperate type in generic for FoodFighter

type FoodFighterExtraInfo = {
    favFood: string
}

type FoodFighter = Player<FoodFighterExtraInfo>

```
