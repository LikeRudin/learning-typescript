---
marp: false
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
  
  background-color: #2F4F4F;
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

# 6 타입 선언과 @types

### 45 devDependencies에 typescript와 @types 추가하기

### 47 타입선언과 관련된 세가지버전 이해하기

### 48 공개 API에 등장하는 모든 타입을 Export 하기

### 49 API 주석에 TSDOC 사용하기

### 50 오버로딩 타입보다는 조건부 타입을 사용하기

### 51 의존성 분리를 위해 미러타입 사용하기

### 52 테스팅타입의 함정에 빠지지 않게 주의하기


---

# 45 devDependencise에 typescript와 @types 추가하기

## package.json의 세가지 의존성

라이브러리 의존성 종류

|depedencies|devDependencies|peerDependencies|
|--|--|--|
|프로젝트 실행에 필요|프로젝트 개발 및 테스트에 필요|의존성을 직접 관리하지 않는 라이브러리|

---

# 45 devDependencise에 typescript와 @types 추가하기

## 타입스크립트 프로젝트에서 고려할 의존성

1. 타입스크립트 자체 의존성

```
npm i typescript
```

2. 타입의존성

```
npm i react

npm i @types/react
- 리액트 패키지 코드의 타입을 제공
```

- `typescript`와 `@types` 버전이 호환되어야 한다.
- 협업자끼리 같은 버전을 사용해야한다

---

# 45 devDependencise에 typescript와 @types 추가하기

## @의 의미

`@` 기호는 npm의 name scope 기능을 제공

@XX 가 붙어있는 패키지- XX팀이 만든 패키지

```s
@nest/typeorm

typeorm을 사용하기위해 nest 팀이 작업한패키지
```

---
# 45 devDependencise에 typescript와 @types 추가하기

## npm i typescript ,  npx 를 사용하지 말것

최신버전설치 (버전옵션 없을경우)
```
npm i typescript 
```

- 협업의 경우 버전을 일치시켜주기 힘들다.

<br>

시스템레벨설치
```
npx i typescript : 시스템레벨로 타입스크립트 설치
```

- typescript를 해당 프로젝트가아닌 전체 시스템에 설치
    - 장점: 프로젝트마다 설치할 필요없이 사용가능
    - 단점: 프로젝트마다 버전 변경 불가능
---
# 45 devDependencise에 typescript와 @types 추가하기

## 협업할경우 package.json을 공유할것

```json
"devDependencies": {
  
  "typescript": "^5.1.6"
  
  },
```
- package.json 파일을 공유

- npm install 키워드로 설치

--- 

# 45 devDependencise에 typescript와 @types 추가하기

## 요약

1. npx로 패키지설치시, 시스템 레벨로 설치된다.
    - 하나의 pc에서 프로젝트별로 다른 버전 패키지 사용이 번거로움

<br>

2. devDependecies를 공유할것

    - @types와 같이 개발과정에만 필요한 패키지를 선별하여 입력
    - npm install typescript로 설치하지말고, devDependencies 공유 후 `npm install` 사용

---

# 46 타입선언과 관련된 세가지 버전 이해하기

## 요약

1. 외부 라이브러리 사용 (ex react)시 의존성은 3개
    - react, @types/react,  typescript 세개가 전부 호환이 되야함

<br>

2. 라이브러리 버전업 -> @types 패키지도 버전업


<br>

3. 사용 언어에 따라 타입 저장위치를 변경할것
    
    - 타입스크립트로 패키지 제작시 타입은 프로그램 내부에
    
    - 자바스크립트 패키지의 타입은 d.ts 파일에


---

# 47 공개 API에 등장하는 모든 타입은 export 하기

## 라이브러리에서 타입을 제공하지 않는경우

라이브러리 함수

```ts
export function getGift(name: SecretName, gift: string): SeretSanta{
    //
}
```
 패키지에서 제공하지 않은 타입
```ts
// secretName, secretSanta를 직접 사용불가

interface SecretName {
    first: string;
    last: string;
}

interface SecretSanta {
    name: SecretName;
    gift: string;
}
```

---

# 47 공개 API에 등장하는 모든 타입은 export 하기

## 타입 추출하기

라이브러리 사용자가 `유틸리티 타입`을 이용해 타입을 추출할 수있다.

```ts
export function getGift(name: SecretName, gift: string): SeretSanta{
    //
}

// 라이브러리 설치유저가 타입을 추출할 수있다.
type MySanta = ReturnType<typeof getGift>;
type MyName = Parameters<typeof getGift>; 
```
---

# 47 공개 API에 등장하는 모든 타입은 export 하기

## 요약

1. 타입스크립트 라이브러리를 베포할때,
 공개 메서드에 등장한 어떤 형태의 타입이든 export 할것

2. 어차피 라이브러리 사용자가 타입스크립트 기능인
 `유틸리티 타입`과 `generic` 을 통해 추출할수있다.

유틸리티 타입 문서: https://www.typescriptlang.org/docs/handbook/utility-types.html

---


# 48 API 주석에 TSDOC 사용하기

## 주석의 종류: comment / JSDOC

comment: 기능이 없는 주석
```js
// exported된 함수입니다.
export function exportedFunction (name) {
    // 함수내용
}
```


JSDoc: 기능이 있는 주석
```js
/**exported된 함수입니다.*/
export function exportedFunction () {
    // function
}
```
---

# 48 API 주석에 TSDOC 사용하기

## JSDOC의 기능

JSDoc/TSdoc의 기능

### 1. 다양한 글꼴 디자인 활용가능
```
/***/ 모양의 TSDoc 주석은 markdown 형식으로 꾸며진다.
굵은 글씨, 이텔릭체, 글머리기호 전부 사용가능
```

### 2. 링크기능

```
함수이름에 마우스커서를 올렸을경우 주석을 보여준다.
```

![](https://user-images.githubusercontent.com/118636461/235598418-0461a3e1-a61c-411c-bb21-4f0c74b7501c.jpg)

---

# 48 API 주석에 TSDOC 사용하기

## TSDoc

`JSDoc`을 타입스크립트 스타일로 사용하는것

JSDOC에의한 함수 설명 - param을 전부 설명함
```js
/**
 *  인사말을 생성합니다.
 * @param name string: 인사받는 사람의 이름
 * @param title String: 인사받는 사람의 칭호
 * @returns 인삿말 문자열
 *
 * /
```

타입스크립트에선 타입정보가 코드에 이미 있다.

`param`, `return` 에대한 타입이 이미 있으므로,
함수주석에는 기능만 설명하도록 한다

```ts
type HelloFunction = (name:string, title:string): hello;

/** 인사말을 생성합니다*/
function sayHello: HelloFunction = (name, title) => {
    return `${name} ${title}님 만나서 반갑습니다.`
}
```

---
# 48 API 주석에 TSDOC 사용하기

## 요약

1. 단순 코멘트보다는 JSDOC을 이용할것
    - 링크기능
    - 디자인 편집가능

<br>

2. 타입정보는 주석에 적지말것 
    - 타입스크립트는 타입정보를 type과 interface 코드로 제공
    - TSDOC 스타일로 사용할것
---

# 49 콜백에서 this에 대한 타입 제공

## this binding

자바스크립트의 this는 상당히 혼란스러움


| 종류        | 일반함수              | 메서드       | 화살표함수             |
| ----------- | --------------------- | ------------ | ---------------------- |
| 형태        | function funcName(){} | function(){} | ()=>{}                 |
| this 바인딩 | 전역객체              | 호출한 객체  | 상위스코프의 this 복제 |

- 일반함수와 메서드의 this는 정의된 방식이아니라 호출된 방식에따라 결정

- 콜백함수를 사용할땐, this에대한 타입정보를 제공할 필요가 있음

---

# 49 콜백에서 this에 대한 타입 제공

## 타입스크립트의 this 캐치

콜백함수의 첫번째 매개변수의 this 는 특별하게 처리된다.

```ts
function addKeyListener(
    el: HTMLElement,
    // 아래의 this는 인자를 두개 받는다.
    fn: (this: HTMLElement, e: KeyboardEvent) => void
    ) {
        el.addEventListener(`keydown`, e => {
            fn(el,e); // Expected 1 arguments, but got 2.
        });
    }
```
- 인자를 두개주자 오류를 출력

- 실제로 this 라는 매개변수를 입력받는것이아니라 바인딩을 표시
---

# 49 콜백에서 this에 대한 타입 제공

## 타입스크립트의 this 캐치

```ts
function addKeyListener(
    el: HTMLElement,
    fn: (this: HTMLElement, e: KeyboardEvent) => void
    ) {
        el.addEventListener(`keydown`, e => {
            fn(e); // The 'this' context of type 'void' 
            //is not assignable to method's 'this' of type 'HTMLElement'..
        });
    }
```
- 인자를 하나만 주어도 오류를 출력함
---
# 49 콜백에서 this에 대한 타입 제공

## 해결법: function.prototype.call 메서드 사용

MDN: function.prototype.call

```s
call() 메소드는 주어진 this 값 및 각각 전달된 인수와 함께 함수를 호출합니다.
```

fn.call(el,e) 로 표기
```ts
function addKeyListener(
    el: HTMLElement,
    fn: (this: HTMLElement, e: KeyboardEvent) => void
    ) {
        el.addEventListener(`keydown`, e => {
            fn.call(el,e)
        });
    }
```
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call
---

# 49 콜백에서 this에 대한 타입 제공

## 요약

1. this binding을 정확시 숙지해야함

2. 콜백에서 this를 사용한다면, 타입정보를 명시해야함

    - call 등 여러가지 보조수단을 활용해야하므로 코드복잡도는 상승
        - 그래도유저에게 명확한 사용을 제시가능

---

# 50 오버로딩 타입보다는 조건부 타입을 사용하기

## 함수 오버로딩 타입

```ts
// 유니온 미사용
type Double = {
    (x: number): number,
    (x: string): string
}

// 유니온 사용
type Double = (x: number|string) => number|string;
```
타입을 사용한 함수 구현

```ts
// 위의 두 타입중 어떤 타입을 사용해도 같은 오류메시지를 볼 수있다.
const double: Double = (x) =>  {
    return x + x // Operator '+' cannot be applied to types
                // 'string | number' and 'string | number'.
}
```
- 매개변수 문제: `string | number` 타입이 들어온다고 판단
    - 타입가드 구현으로 해결

<BR>

- 반환타입 문제: `string | number` 타입을 반환할 순없음
    - 해결불가: `as any` 를 함수 선언마다 사용하는것은 곤란
---

---

# 50 오버로딩 타입보다는 조건부 타입을 사용하기

## 조건부 타입 사용

```ts
type Double<T> = <T extends number|string> (x: T) => T extends string? string : number;
```
- 자바스크립트의 삼항연산자처럼 사용
- T가 string으로 표현가능시 string 그외에는 number라고 인식

```ts
const double: Double =  function(x: any){
    return x + x;
}

double({})
//error: Argument of type '{}' is not assignable to parameter of type 'string | number'
```
- any로 선언했지만, 진짜로 아무거나 넣을순 없음
---
# 50 오버로딩 타입보다는 조건부 타입을 사용하기

## 요약

1. 오버로딩 타입을 사용할수록, 코드의 복잡도가 상승

2. 조건부 타입을 사용하면 추가적 오버로딩 코드 작성이 필요없음

---

# 51 의존성 분리를 위해 미러타입 사용하기

## 미러링

필요한 선언부만 추출하여 작성중인 라이브러리에 넣는것

---


# 51 의존성 분리를 위해 미러타입 사용하기

## 라이브러리 작성 예제

스트링과 버퍼를 입력받아 `{key: value}` 배열을 출력하는 함수

```ts
function parseCSV(contents: string | Buffer): {[column: string]: string}[] {
    if typeof contents === `object`{
        // 버퍼인경우
        return parseCSV(contents.toString(`utf8`));
    }
}
```

- Buffer는 Node에만 존재
    - 사용을 위해 @types/node 설치필요
---

# 51 의존성 분리를 위해 미러타입 사용하기

## @types/node 포함시 문제점

사용자들에게 불필요한 의존성 제공

- devDependencies에 @types/node를 설치할 필요가 없는 사용자

    - 자바스크립트만 사용하는 개발자

    - Node를 안쓰는 typescript 개발자
     
---


# 51 의존성 분리를 위해 미러타입 사용하기

## 해결법: 구조적 타이핑


Buffer의 요소를 일부 가지고있는 타입을 직접정의

```ts
interface CSVBuffer {
    toString(encoding: string): string
}

function parseCSV(contents: string | CSVBuffer): {[column:string]: string}[] {
    //.. 구현
}

parseCSV(Buffer);
```

- Buffer는 CSVBuffer의 요소를 가짐
    - 구조적 타이핑에 의해 문제없이 할당

- @types/Node를 설치할 필요가 없어짐.
---

# 51 의존성 분리를 위해 미러타입 사용하기

## 요약

1. 의존성: dependencies에 설치된것

2. 다음의 의존성은 부적절함 
    - 자바스크립트 개발자 @type 패키지 설치
    - 타입스크립트 웹개발자가 @types/Node 설치

3. 구조적 타이핑을 이용해 잘 분리할것

---

# 52 테스팅타입의 함정에 주의하기

## 타입도 테스트가 필요함

1. 실행 타입 체크

2. 반환 타입 체크

---


# 52 테스팅타입의 함정에 주의하기

## 실행 타입 체크

배열 원소들의 타입을 변환하는 함수

구현체 없는 타입
```ts
declare function map<U,V>(array: U[], fn: (u:U) => V): V[];

map(['2020', '2021', '2022', '2023'], v => Number(v));
```

---

# 52 테스팅타입의 함정에 주의하기

## 일반적인 테스트 코드는 실행만 테스트

실행에 오류가 없는지 테스트
```js
function summarizeYear

test(`연도를 두자릿수의 숫자로 바꿔줍니다`, () => {
    summarizeYear(`2020`);
    summarizeYear(`2021`);
});
```
- 반환값의 타입은 테스트하지 않는다.


---
# 52 테스팅타입의 함정에 주의하기

## 반환값을 테스트하기

실제 값에서 잉여 타입을 선언하여 검사하기 
```ts
declare function map<U,V>(array: U[], fn: (u:U) => V): V[];

// 실제 내가 사용할 변수에서 타입을 체크
const lengths: number[] = map(["hello", "hi"], name => name.length);
```
- 문제점
    1. 불필요한 타입선언 `number[]`
    2. 실제 동일한 타입이 아닌 `할당 가능성`을 체크
---


# 52 테스팅타입의 함정에 주의하기

## 할당 가능성 체크: 구조적 타이핑

```ts
declare function map<U,V>(array: U[], fn: (u:U) => V): V[];

const beatles = [`john`, 'paul', 'george', 'ringo'];

const checkSubmarine: {name: string}[] = map(beatles, name => ({
    name,
    isYellowSubmarine: name === 'ringo'
}))
```

- 변수에 저장되는 값의 타입은 {name:string, isYellowSubmarine:boolean}[] 
- 오류는 출력되지 않음
---
# 52 테스팅타입의 함정에 주의하기

## 할당 가능성 체크: 구조적 타이핑


- 문제가 없는이유는 타입스크립트의 구조적 타이핑 때문
    - 함수는 매개변수가 더 적은 타입에 할당가능


- 콜백함수에서 자주 사용 
    - express 미들웨어는 (error, req, res, next) 네개중에 (req, res)만 사용
        - 타입문제 발생 X

---

# 52 테스팅타입의 함정에 주의하기

## 제대로된 타입 테스트 코드: 유틸리티 타입 이용

```
const p: Parameters<typeof double> 
const r: ReturnType<typeof double>
```

---

# 52 테스팅타입의 함정에 주의하기

## 제대로된 타입 테스트 도구: dtslint 사용

특별한 주석을 통해 타입체크를 수행
```ts
declare function map<U,V>(array: U[], fn: (u:U) => V): V[];

const beatles = [`john`, 'paul', 'george', 'ringo'];

map(beatles, function(
    name, // $ExpectType string
    i,    // $ExpectType number
    array // $ExpectType array[]
) {
    this // $ExpectType string[]
    return name.length;
});      // $ExpectType number[]
```

- 단점: `string | number`와 `number | string` 을 다른것으로 인식

---


# 52 테스팅타입의 함정에 주의하기

## 요약

1. 타입도 테스트대상

2. 함수의 실행(매개변수) 뿐만 아니라 반환값도 테스트 필요

3. 타입이 동일한것과 할당 가능한것은 다름
    - 구조적 타이핑을 명심


---

### 후기:

너무 라이브러리 작성자에 초점을 둔 것 같다.

하지만 타입선언이 원래 그런것이라 이해한다.