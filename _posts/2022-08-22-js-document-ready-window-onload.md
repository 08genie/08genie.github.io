---
title: "[jQuery] document.ready()와 window.onload의 차이"
author: genie
date: 2022-08-22 10:39:10 +0900
categories: [Language, JavaScript & jQuery]
tags: [javascript, js, How to, study, jquery]
---

## $(document).ready()
---
 - 외부 리소스 및 이미지 로딩과 관계 없이 DOM(document object model)트리 생성 직후 실행됩니다.
 - 중복으로 사용 가능하기때문에 순서대로 실행됩니다.
<br>
<br>
<br>

## window.onload
---
 - 모든 자원의 로딩이 모두 끝난 후에 실행됩니다.
 - 한 페이지에서 하나의 window.onload 함수만 적용되기 때문에 가장 나중에 호출된 window.onload함수만 실행됩니다.
<br>
<br>
<br>

## 실행 순서
---
 ```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Insert title here</title>
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script type="text/javascript">               
           window.onload = function() {
            console.log("window.onload => 1");
           };

           window.onload = function() {
            console.log("window.onload => 2");
           };

           $(document).ready(function() {
            console.log("document.ready => 1");
           });

           $(document).ready(function() {
            console.log("document.ready => 2");
           });   
        </script>
    </head>
</html>
```
<br>
<br>
<br>

## 실행 결과
---
![Desktop View](/assets/img/2022-08-22/1.png){: width="100%" }
