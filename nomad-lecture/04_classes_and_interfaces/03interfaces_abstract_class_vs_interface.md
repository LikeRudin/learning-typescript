# contents

1. readonly

2. static

3. abstract class versus interface

## 1. readonly

this is typescript component for class's elements

```

public readonly a = "hi";

// we can save value in above a by doing this
const a = instance.a ;

// we cannot dynamically change the value like this
instance.a = "hello";
```

it is eleminated when typescript compiled to javascript

## 2. static

- this is javascript component for class's elements

given class property (or methods)

it create in-class elements

so we can call in-class elements by class, not by instance of class

## 3. abstract class vs interface

abstract class is a class.

it is complied to `normal class` for javascript

we can specify the shape of class by using interface , too

but interface doesn't provide modifiers like `public`, `readonly`,`private`, `protected`...

use proper thing for your team.

|                     | interface  | abstract class |
| ------------------- | ---------- | -------------- |
| keyword for inherit | implements | extends        |
| after complie       | elemenated | remain         |
| can usemodifier     | X          | O              |
