---
title: "[Flutter] Stateless Widget 과 Stateful Widget 의 차이점"
author: genie
date: 2022-09-22 22:36:10 +0900
categories: [Framework, Flutter]
tags: [flutter, stateless, stateful, 
difference, How to, Study]
---

## Stateless Widget 이란?
---
**'상태가 없다'** 라는 것을 의미하며, 한 번 build 함수가 실행되어 화면에 표시 되면 화면을 변경할 수 없습니다. ``즉 하나의  Stateless 위젯은 라이프 사이클 동안 단한번의 build 함수를 실행합니다.``
<br>
<br>
<br>

## Stateless Widget 라이프 사이클
---

![Desktop View](/assets/img/2022-09-22/1.png){: width="100%" }
<br>
<br>
<br>

## Stateful Widget 이란?
---
Stateless와 반대로 **'상태가 있다'** 라는 것을 의미하며, 위젯이 작동하는 동안 data의 변경이 필요한 경우 화면을 다시 그려서 변경된 부분을 위젯에 반영합니다. 체크 박스에 따라 화면을 변경하거나 색상을 조정하는 등 동적인 화면 변화가 필요한 경우 사용합니다.
<br>
<br>
<br>

## Stateful Widget 라이프 사이클
---

![Desktop View](/assets/img/2022-09-22/2.png){: width="100%" }