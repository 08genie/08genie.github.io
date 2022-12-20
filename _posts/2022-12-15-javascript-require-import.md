---
title: "[Javascript] require(CommonJs) import(ES6) 차이와 사용법"
author: genie
date: 2022-12-15 22:43:10 +0900
categories: [Language, Javascript]
tags: [require, import, CommonJs, ES6]
---

## require import 차이(CommonJs ES6)
---
require와 import는 모듈 키워드로, 외부 파일이나 라이브러리를 불러올때 사용 합니다. require는 NodeJS에서 사용되는 CommonJS 키워드이고 import는 ES2015에서 새로 도입된 키워드 입니다. <br><br>
requrie
```javascript
const library = require("library")
```
import
```javascript
import library from "library"
```

ES6(ES2015) 모듈 시스템은 점점 더 널리 사용되고 있는 추세이지만 아직까지는 import 키워드가 100% 대체되어 사용 될 수 없습니다. script 태그를 사용하는 브라우저 환경과, NodeJS에서도 CommonJS를 기본 모듈 시스템으로 채택하고 있기 때문에, Babel과 같은 ES6 코드를 변환 해주는 도구를 사용할 수 없는 경우에는 require 키워드를 사용해야 합니다. 
<br>
<br>
하지만 ES6 모듈 시스템이 최신 스펙 이다보니 CommonJS 방식 대비 여러가지 이점들이 있습니다.
- import, from, export, default 처럼 모듈관리 전용 키워드를 사용하기 때문에 가독성이 좋습니다.
- 비동기 방식으로 작동하고 모듈에서 실제로 쓰이는 부분만 불러오기 때문에 성능과 메모리 부분에서 유리합니다.
<br>
<br>
<br>

## CommonJS 모듈 사용법
---
**단일 객체 내보내기/불러오기**<br>
두개의 함수를 객체로 묶어서 내보내기를 헸습니다. 하나의 객체를 내보낼 경우, module.exports 변수 자체에 할당합니다.
- 내보내기

```javascript
// 내보내지 않음
const plus = function (a,b) {
    let result;
    result = a + b;
    return result
}

// 내보내기
const obj = {};
obj.minus = function (a,b) {
    let result;
    result = a - b;
    return result;
}

obj.multiply = function (a,b) {
    let result;
    result = a * b;
    return result;
}

module.exports = obj; 
```
{: file='math.js'}

- 불러오기

```javascript
const math = require("./math");

console.log(math.minus(2, 1));
console.log(math.multiply(1, 2));
```

- 실헹 결과

![Desktop View](/assets/img/2022-12-15/1.png){: width="100%" }
<br>
<br>
<br>

**복수 객체 내보내기/불러오기**<br>
여러개의 객체를 내보낼 경우, exports 변수의 속성으로 할당합니다.
- 내보내기

```javascript
const plus = function (a,b) {
    let result;
    result = a + b;
    return result
}

const minus = function (a,b) {
    let result;
    result = a - b;
    return result;
}

const multiply = function (a,b) {
    let result;
    result = a * b;
    return result;
}

exports.minus  = minus;
exports.multiply = multiply;
```
{: file='math.js'}

- 불러오기

```javascript
const math = require("./math");

console.log(math.minus(2, 1));
console.log(math.multiply(1, 2));
```

- 실행 결과

![Desktop View](/assets/img/2022-12-15/1.png){: width="100%" }
<br>
<br>
<br>

## ES6 모듈 사용법
---
**단일 객체 내보내기/불러오기**<br>
하나의 객체를 내보낼 경우, export default 키워드를 사용해서 명시적으로 선언해줍니다. 하나의 모듈에서 하나의 객체만 내보내기 때문에 이를 Default Export라고 합니다.
- 내보내기

```javascript
// 내보내지 않음
const plus = function (a, b) {
    let result;
    result = a + b;
    return result
}

// 내보내기
export default {
    minus(a, b) {
        let result;
        result = a - b;
        return result;
    },

    multiply(a, b) {
        let result;
        result = a * b;
        return result;
    }
}
```
{: file='math.js'}

- 불러오기

```javascript
import math from './math';

console.log(math.minus(2, 1));
console.log(math.multiply(1, 2));
```

- 실행 결과

![Desktop View](/assets/img/2022-12-15/1.png){: width="100%" }
<br>
<br>
<br>

**복수 객체 내보내기/불러오기**<br>
import 키워드의 짝꿍인 export 키워드를 사용하여 명시적으로 선언해줍니다.  이때 내보내는 변수나 함수의 이름이 그대로 불러낼 때 사용하게 되는 이름이기 때문에 이를 Named Exports 라고 합니다.

- 내보내기

```javascript
// 내보내지 않음
const plus = function (a, b) {
    let result;
    result = a + b;
    return result
}

// 내보내기 1
export function minus(a, b) {
    let result;
    result = a - b;
    return result;
}

// 내보내기 2
const multiply = function (a, b) {
    let result;
    result = a * b;
    return result;
}

export {multiply};

```

- 불러오기

```javascript
import {minus} from "./math";
console.log(minus(2, 1));

import * as math from "./math";
console.log(math.multiply(1, 2))
```

- 실행 결과

![Desktop View](/assets/img/2022-12-15/1.png){: width="100%" }








