---
title: "[Flutter] 플러터(Flutter) 그라데이션(Gradation)"
author: genie
date: 2022-09-26 22:30:10 +0900
categories: [앱개발, Flutter]
tags: [flutter, 플러터, 그라데이션, 그라디언트, gradation, gradient, How to, Study]
---

## 그라디언트(Gradient) 종류
---
- **RadialGradient** : 원을 중심으로 퍼지는 그라데이션 효과입니다.
<br>
- **LinearGradient** : 시작점과 끝점을 지정하여 그라데이션을 만듭니다.
<br>
- **SweepGradient**  : center에서 시작하고 startAngle을 중심으로 스윕 그라데이션을 만듭니다.
<br>
<br>
<br>

## RadialGradient 사용법
---
```dart
  BoxDecoration getBoxDecoration() {
    return BoxDecoration(
        gradient: RadialGradient(
            center: Alignment(0, -0), // 그라데이션의 중심점 위치
            radius: 0.2,
            colors: <Color>[
            Color(0xFFFFFF00), 
            Color(0xFF0099FF), 
            ],
            stops: <double>[0, 1], // 색상이 차지할 위치
       ) 
    );
  }
```
![Desktop View](/assets/img/2022-09-26/1.png){: width="100%" }
<br>
<br>
<br>

## LinearGradient 사용법
---
```dart
  BoxDecoration getBoxDecoration() {
    return BoxDecoration(
        gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF2A3A7C),
              Color(0xFF000118),
            ]
        )
    );
  }
```
![Desktop View](/assets/img/2022-09-26/2.png){: width="100%" }
<br>
<br>
<br>

## SweepGradient 사용법
---
```dart 
  BoxDecoration getBoxDecoration() {
    return BoxDecoration(
        gradient: SweepGradient(
          center: FractionalOffset.center,
          colors: <Color>[
            Color(0xFF4285F4), 
            Color(0xFF34A853), 
            Color(0xFFFBBC05), 
            Color(0xFFEA4335), 
            Color(0xFF4285F4), 
          ],
          startAngle: 1.0, //startAngle과 endAngle을 삭제하면 화면 전체가 그라데이션됩니다.
          endAngle: 9.2,
          stops: <double>[0.0, 0.25, 0.5, 0.75, 1.0],
        )
    );
  }
```
![Desktop View](/assets/img/2022-09-26/3.png){: width="100%" }