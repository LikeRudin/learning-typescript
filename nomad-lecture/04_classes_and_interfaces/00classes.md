# contents

<br>

0. constructor: different points from javascript

1. modifier: private, public, protected

2. abstract: class, method

<br>

## 0. constructor

<br>

different point from javascript

function runs when creation of instance to initialize properties

<br>

## 1. modifier

<br>

functionality: set accessibility from outside of class

| private     | protected   | public             |
| ----------- | ----------- | ------------------ |
| inner class | inner class | inherited subclass |
|             | subclass    | subclass           |
|             |             | as instance method |

<br>

- default is `public`

- these are pure-typescript components, not applied on transfiled javascript code

<br>

## 2. abstract: class, method

<br>

type or call signature witout defining implementations

<br>

### abstract class

<br>

cannot create instance.

it must be inherited to non-abstract subclass

```
abstract class Greeting {

}

class SayHi extends Greeting {}
```

<br>

### abstract method

<br>

method having `anstract` declarer within absctract class

it cannot have implementation, must have only call signature type.

<br>
```
