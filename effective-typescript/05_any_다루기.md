---
marp: true
---

<style>
h1 {
  color: white;
}

section {
  background-color: black;
  color: azure;
}

pre, td {
  
  background-color: #212121;
}

td {
  
  width: 300px;
  text-align: center;
}

th {
  width: 300px;
  text-align: center;
  color: black;
  background-color: skyblue;
}

</style>

# 5장 any 다루기

---

## 38 any는 가능한 좁은범위에서 사용하기

### 함수의 인자로 any 쓰기

<br>

특정 함수의 반환값의 타입을 알수 없다면,

타입 단언 `x as 타입이름` 을 사용하는게 좋습니다.

- 나쁜 예시: 변수를 any로 선언

```js
const func = () => {};

const x: any = returnUnexpectableValue();

func(x);
```

---

## 38 any는 가능한 좁은범위에서 사용하기

### 함수의 인자로 any 쓰기

- 좋은 예시: 타입 단언을 사용

```js
const x = returnUnexpectableValue();

func(x as any);
```

<br>
- 좋은 예시2: `//@ts-ignore` 편집기에 무시 명령

```ts
const x = returnUnexpectableValue();

//@ts-ignore
func(x);
```

---

## 38 any는 가능한 좁은범위에서 사용하기

### 타입 단언

<br>

특정 위치에서 변수를 해당 타입으로 사용한다고 지정해주는 것

`x as any`

---

## 38 any는 가능한 좁은범위에서 사용하기

### 객체의 프로퍼티 타입에 as any 적용하기

타입에는 없는 프로퍼티c가 존재하는 경우

```ts
type Config = {
  a: number;
  b: number;
};

const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value, // error, COnfig doesn't have c
  },
};
```

---

## 38 any는 가능한 좁은범위에서 사용하기

### 객체의 프로퍼티 타입에 as any 적용하기

```ts
// 나쁜예시: 객체 전체에 타입단언
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
  },
} as any;

// 좋은예시: 해당 속성에만 타입단언
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value as any,
  },
};
```

---

## 39. any를 구체적으로 변형해서 사용하기

<br>

### any는 모든 타입을 포괄

- 숫자, 문자열 배열, class, undefined...

<br>

일반적으로 그냥 `any` 보다 구체적인 `modified any` 타입이 존재

---

## 39. any를 구체적으로 변형해서 사용하기

<br>

### 배열의 타입을 모를때

` any` 대신 `any[]`

- 적어도 배열이라는 정보가 제공

```ts
// 나쁜예시
const getArray = (arr: any) => {};

// 좋은예시
const getArray = (arr: any[]) => {};
```

---

## 39. any를 구체적으로 변형해서 사용하기

<br>

### 객체의 타입을 모를때

`key:value`쌍을 성분으로 갖는 객체를 선언시

`object`타입은 현명한 선택이 아님

- object로 여겨지는 모든것을 포함

```
Map 객체는 key값에 다양한 타입이 올 수 있지만 object로 취급.
```

---

## 39. any를 구체적으로 변형해서 사용하기

<br>

### 객체의 타입을 모를때

`dictionary` 의 성분 : `key:value` 에서 `key`의 타입은 언제나 `string`

- 해당 타입정보만 제공해도, `any`나 `object` 보다 상세

```ts
//나쁜예시
const getObject = (obj: any) => {};

const getObject = (obj: object) => {};

// 좋은예시
const getObject = (obj: { [key: string]: any }) => {};
```

---

## 40 함수 내부로 타입 단언문 감추기

타입 단언문이 any 선언문보다는 안전

- 일반적으로 위험한것은 마찬가지
  - 함수 내부에서만 부분적으로 사용

```ts

const func1 () => {
    return func2(arg) {

    } as any

}
```

---

## 41 any의 진화를 이해하기

일반적으로 타입은 코드가 진행될수록 범위가 좁아짐

하지만 암시적 any는 범위가 점점 증가

- 이는 편집기가 타입을 추적하는 작업을 증가

```ts
const example = []; // any 타입

const example.push("a");  // string[] 타입

const example.push(3); // string | number [] 타입
```

되도록 명시적 타입선언 권장

---

# 42 any 대신 unknown 사용하기

unknown을 사용하면, 타입가드 (type guard) 구현이 강제

즉, 해당 변수를 사용할때, 엄격하게 타입체크를 거치게 함

- 오류 발생

```ts
let a: unknown = 7;

4 + a

// editor error message
'a' is of type 'unknown'

let a: unknown = 7;

if (typeof a === "number") {
  // 타입가드
  a + 4;
}
```

---

# 42 any 대신 unknown 사용하기

### 타입가드(type guard)

`unknown`, `유니온 타입 |` 변수를 위한 타입 검사 코드

```ts
type NumOrStr : number | string

type Add = (a: NumOrStr, b: NumOrStr): NumOrStr

const add: Add = (a,b) => {
    if (typeof a === "string" && typeof b === "string"){
        return a + b
    }
    else if (typeof a === "number" && typeof b === "number"){
        return a + b
    }
    else {
        console.log("use same type args")
        return "ERROR"
    }
}
```

---

## 43 몽키패치보다는 안전하게 타입을 추가하기

### 몽키패치

제대로된 타입명세 없이 동적으로 객체에 아이템을 추가하는것

- 몽키 패치

```ts
document.monkey = "this is monkey patch";
```

- 문제점

```ts
document.monkey;

// editor: there is no monkey in document type
```

- document `타입`에는 monkey 속성이 없다.

---

## 43 몽키패치보다는 안전하게 타입을 추가하기

- 편집기 오류를 없애기 위한 떔질

<br>

```ts
(document as any).monkey;

//@ts-ignore
document.monkey;
```

---

## 43 몽키패치보다는 안전하게 타입을 추가하기

- 타입 보강 : document에 monkey 속성추가

```ts
interface document {
  monkey: string;
}

document.monkey;
```

- 문제점: 이제 `document`에 `monkey` 속성의 구현이 강제

<br>

- 솔루션: 새로운 타입 선언

```ts
interface monkeyDocument extends document {
  monkey: string;
}
// monkey 호출시에만 새로 선언한 타입 단언을 사용
(document as monkeyDocument).monkey;
```

---

## 44 타입 커버리지를 추적하여 타입 안정성 유지하기

<br>

### @types 패키지를 통한 any의 침입

`noImplicityAny: true` 옵션은 암묵적 any를 표시

```ts
const myFunc = (a) => {};

// a is implicit any: a는 암묵적 any 입니다.
```

편집기에 표시되는 암묵적 any를 전부 제거해도, 암묵적 any는 존재 가능

- `@types` 라이브러리를 통해, any가 침투 할 수 있음

---

## 44 타입 커버리지를 추적하여 타입 안정성 유지하기

<br>

### 타입 커버리지 설치

<br>

`npx create-type-coverage`

- 현재 타입에서 명시적, 암시적 any의 개수 및 비율 표시

<br>

`--detail` 플래그 : 해당 any의 위치도 추적가능
