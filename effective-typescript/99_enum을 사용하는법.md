 # 230826 타입스크립트 스터디


# enum을 사용하는법

1. enum은 단독으로 사용하지 마세요.

2. 숫자enum은 타입으로 사용하세요

3. 변수관리는 class의 static readonly로도 할 수 있습니다.

## 1. 순수 enum은 사용하지 마세요.

```ts
// 타입스크립트 선언
enum Direction {
    Up,
    Down,
    Left,
    Right
}
// 자바스크립트로 컴파일
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
```

- `enum`은 자바스크립트에 포함되지 않는 타입스크립트 요소
- 일반적으로 타입스크립트만의 구성요소는 컴파일시 없어짐
- `enum` 은 자바스크립트로 컴파일됨
    - 실제로 enum을 사용하는 코드가없어도 `production` 번들링에 포함
## const 와 함께 사용하세요

`const`와 함께 선언된 `enum`은 컴파일시 삭제된다.
```ts
const enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

## 숫자 열거형

```ts
// 타입스크립트 코드
enum Weekdays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday = 10,
  Friday,
  Saturday,
  Sunday,
}
// 자바스크립트로 컴파일된 코드
var Weekdays;
(function (Weekdays) {
    Weekdays[Weekdays["Monday"] = 0] = "Monday";
    Weekdays[Weekdays["Tuesday"] = 1] = "Tuesday";
    Weekdays[Weekdays["Wednesday"] = 2] = "Wednesday";
    Weekdays[Weekdays["Thursday"] = 10] = "Thursday";
    Weekdays[Weekdays["Friday"] = 11] = "Friday";
    Weekdays[Weekdays["Saturday"] = 12] = "Saturday";
    Weekdays[Weekdays["Sunday"] = 13] = "Sunday";
})(Weekdays || (Weekdays = {}));
let day = Weekdays.Thursday;
```

## 숫자열거형은 타입으로 사용하세요

문자열은 값을 마음대로 재지정 불가능
```ts
const enum Direction {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Light"
}

let dir: Direction = Direction.Up;

dir = "Down"
//Type '"Down"' is not assignable to type 'Direction'.

//자바스크립트로 변환된 코드
let dir = "Up" /* Direction.Up */;
```

숫자형은 가능
```ts
enum Weekdays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday = 10,
  Friday,
  Saturday,
  Sunday,
}
let day = Weekdays.Thursday;
day = 12;
```
타입으로 사용시 재지정을 막음
```ts
let day: Weekdays.Thursday = Weekdays.Thursday;
day = 12;
//Type '12' is not assignable to type 'Weekdays.Thursday'.(2322)
//let day: Weekdays.Thursday
```

# 3. 변수관리는 class의 static readonly도 할수 있습니다.

`const`와 `숫자타입` 을 사용하지 않을시 , `class`의
`static`, `readonly`를 사용하는것을 추천

```ts
class myDirection {
  static readonly Up = "Up";
  static readonly Down = "Down";
  static readonly Left = "Left";
  static readonly Right = "Right";
}

let newDir = myDirection.Up;
```
- js로 컴파일되나, 순수 js코드이기때문에 상관없음.
--- 

# 요약

1. 단독으로 사용된 enum은 ts 순수요소지만, js로 컴파일된다.
    - enum을 다른곳에서 사용하지않더라도, `production`` 번들링에 코드가 들어간다.
    - const와 함께 사용하면 js 에는 enum이 사라진다.

<br>

2. 숫자 열거형의 개별항목을 타입으로 사용하라
    - 한번 값을 넣어주면, 바꾸지 못하게 해야한다.
    - 하지만 숫자는 바뀐다.
    - 개별항목을 타입으로 넣어줘라

<br>

3. 위 두가지 요소를 신경쓰지 않는다면, class를 사용하는것과 같다.
