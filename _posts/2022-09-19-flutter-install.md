---
title: "[Flutter] 윈도우(Window)에서 플러터(Flutter) 설치 하기"
author: genie
date: 2022-09-19 16:52:10 +0900
categories: [앱개발, Flutter]
tags: [flutter, 플러터, 설치, install, How to, Study]
---

## 플러터(Flutter)란?
---
구글에서 만든 Dart 언어로 개발 가능한 크로스 플랫폼 프레임워크 입니다. 하나의 코드베이스로 iOS 모바일, 안드로이드 애플리케이션 개발이 가능 합니다. 공식 개발환경 IDE로는 ``VSCode``와 ``안드로이드 스튜디오``가 있습니다.
>  크로스플랫폼(Cross Platform) : "교차"를 뜻하는 "Cross"와 Platform의 합성어로, ``다양한 플랫폼에서 사용할 수 있는`` 이라는 뜻을 가집니다. 즉 ``서로 다른 환경에서도 동작 할 수 있는 플랫폼을 크로스 플랫폼이라고 합니다.``
{: .prompt-info }
<br>
<br>

## 플러터(Flutter) 설치 하기
---

**Notice** : 플러터를 설치하기 전 안드로이드 스튜디오([**AndroidStudio**](https://developer.android.com/studio))를 먼저 다운로드 해주세요.
<br>

1. 먼저 플러터([**Flutter**](https://flutter.dev/)) 홈페이지에 접속하여 오른쪽상단의 Docs 버튼을 클릭하고 ``Get started`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-19/1.png){: width="100%" }
<br>
<br>
<br>

2. ``Windows`` 버튼을 클릭하고 아래와 같이 ``Git for Windows``를 클릭하여 git 다운로드 페이지로 이동합니다.
![Desktop View](/assets/img/2022-09-19/2.png){: width="100%" }
<br>
<br>
<br>

3. ``Click here to download``를 클릭하여 git을 다운로드 하고 설치 파일을 실행합니다. git 설치는 특별한 것이 없으므로 모두 ``next`` 버튼을 클릭하여 설치 진행해주세요. 
![Desktop View](/assets/img/2022-09-19/3.png){: width="100%" }
<br>
<br>
<br>

4. git 설치 후 다시 플러터 홈페이지로 돌아옵니다. 스크롤을 내려 아래에 기재된 ``git clone https://github.com/flutter/flutter.git -b stable`` 코드를 복사해줍니다.
![Desktop View](/assets/img/2022-09-19/4.png){: width="100%" }
<br>
<br>
<br>

5. 윈도우 왼쪽 하단 검색창에 ``Windows PowerShell``을 검색하여 실행하고 아래 코드를 차례대로 입력합니다.
<br>
<br>
라이브러리 폴더를 만듭니다.
```
    mkdir libraries
```
<br>
방금 생성한 라이브러리 폴더로 진입합니다.
```
    cd ./libraries
```
<br>
이전 단계에서 복사한 코드를 붙여넣기 합니다.
```
    git clone https://github.com/flutter/flutter.git -b stable
```
<br>
생성된 플러터 bin 폴더로 이동합니다.
```
   cd ./flutter/bin
```
<br>
아래 코드를 입력 하면 현재 bin 폴더의 경로를 확인 할 수 있습니다. 경로를 복사해주세요.
```
    pwd
```
<br>
<br>

6. 윈도우 왼쪽 하단 검색창에 ``시스템 환경 변수 편집``을 검색하여 들어간 후 하단의 ``환경 변수`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-19/5.png){: width="100%" }
<br>
<br>
<br>

7. 시스템 변수에서 Path 를 선택하고 편집 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-19/6.png){: width="100%" }
<br>
<br>
<br>

8. 오른쪽 ``새로만들기`` 버튼을 클릭하고 이전 단계에서 복사했던 bin 폴더의 경로를 붙여넣기 해준 후 확인 버튼을 클릭하여 환경 변수 설정을 마무리 해줍니다.
![Desktop View](/assets/img/2022-09-19/7.png){: width="100%" }
<br>
<br>
<br>

9. 다시 ``Windows PowerShell``을 실행하여 아래 명령어를 실행합니다. 플러터를 설치 후 정상 동작 할 수 있는 환경이 구성되어있는지 확인하기 위함입니다.
```
    flutter doctor
```
<br>
<br>

10. cmdline-tools 이슈를 해결하기 위해 안드로이드 스튜디오를 열어 SDK Tool을 설치해줍니다.
<br>
<br>
Settings -> 왼쪽 상단에 SDK 검색 -> Android SDK -> SDK Tools -> Android SDK Command-line Tools(latest) 체크 -> OK
![Desktop View](/assets/img/2022-09-19/8.png){: width="100%" }
<br>
<br>
<br>

11. ``Windows PowerShell``로 돌아와 아래 코드를 실행하여 라이센스 정보를 업데이트 해주면 완료입니다!
```
    flutter doctor --android-licenses
```
<br>
<br>

## 안드로이드 스튜디오(Android Studio) 프로젝트 생성하기
---

1. 먼저 플러터 프로젝트를 만들기 위해 plugin에서 flutter를 설치해주어야 합니다. 아래와 같이 flutter를 검색하여 설치 후 ``OK`` 버튼을 클릭해 안드로이드 스튜디오를 재시작해주세요. 
![Desktop View](/assets/img/2022-09-19/9.png){: width="100%" }
<br>
<br>
<br>

2. File -> New -> New Flutter Project 를 클릭합니다.
![Desktop View](/assets/img/2022-09-19/10.png){: width="100%" }
<br>
<br>
<br>

3. 이전 단계에서 flutter를 설치했던 폴더를 선택후 ``Next`` 버튼을 클릭합니다. 마지막으로 프로젝트 이름과 경로를 설정하여 ``Finish`` 버튼을 클릭하면 프로젝트가 생성 됩니다.
![Desktop View](/assets/img/2022-09-19/11.png){: width="100%" }
