---
title: "[Github Blog] 블로그(Blog) 만들기"
author: genie
date: 2022-08-13 15:24:10 +0900
categories: [형상관리, GitHub]
tags: [GitHub Blog, GitHub Pages, How to, Study]
---

## Github Blog(깃 블로그)란?
---
Github 저장소에 저장된 html 파일과 같은 정적 웹 문서들을 GitHub에서 무료로 웹에서 볼 수 있도록 호스팅을 제공해 주는 서비스가 존재합니다. 바로 Github Page입니다. 이 Github Page를 이용하여 Blog를 만든것이 Github Blog(깃블로그)입니다. 그렇기 때문에 Github을 이용하는 사용자들은 누구나 고유의 정적 웹 사이트 가질 수 있습니다.
<br>
<br>

## Step 1. Github page 생성
---
**Notice** : github 가입이 되어 있지 않다면 [**Github**](https://github.com) 먼저 가입해주세요!
<br>

1. 본인의 Github계정(https://github.com/{username})으로 접속 후 New 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-13/1.jpg){: width="100%" }
<br>
<br>
<br>

2. repository name을 아래와 같이 작성 하고( {username}.github.io ) Create repository 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-13/2.png){: width="100%" }
<br>
<br>
<br>

3. 생성한 repository로 이동 한 후 setting > pages 에서 아래 그림과 같이 정상적으로 나의 사이트가 생성 되었다면 https://{username}.github.io/ URL로 접근 가능합니다. 
![Desktop View](/assets/img/2022-08-13/3.png){: width="100%" }
<br>
<br>
<br>

## Step 2. Github Desktop, VSCode 설치
---
**Download** 
- Github Desktop( <https://desktop.github.com> )
- VSCode( <https://code.visualstudio.com> )
<br>
<br>

**Github Desktop이란?** Windows 에서도 Git 소스를 GUI로 편리하게 관리할 수 있는 Tool 입니다.
<br>
**VSCode란?** Visual Studio Code의 약자로 Microsoft에서 오픈소스로 개발한 소스 코드 에디터입니다. 
<br>
<br>
Github Desktop과 VSCode 설치 완료 후 Github Desktop을 통해 Github Repository를 로컬에 Clone 해보겠습니다!

1. Github Desktop에서 로그인 후 이전 단계에서 생성한 "{username}.github.io"를 선택 하고 Clone 버튼을 클릭 합니다.
![Desktop View](/assets/img/2022-08-13/4.png){: width="100%" }
<br>
<br>
<br>


2. Local path에 Clone 하고자 하는 경로를 선택후 Clone 버튼을 클릭하면 해당 Github Repository가 연동됩니다.
![Desktop View](/assets/img/2022-08-13/5.png){: width="100%" } 
<br>
<br>
<br>

3. 아래 그림과 같이 Open in Visual Studio Code 버튼을 클릭하면 VScode가 실행되어 코드작성을 할 수 있습니다.
![Desktop View](/assets/img/2022-08-13/6.png){: width="100%" } 
<br>
<br>
<br>

## Step 3. Jekyll 테마 적용 및 Ruby 설치
---
**Download**
 - jekyll( <http://jekyllthemes.org/> )
 - Ruby( <https://rubyinstaller.org/downloads/> )
<br>
<br>

**사용테마**
- jekyll-theme-chirpy( <http://jekyllthemes.org/themes/jekyll-theme-chirpy> )
<br>
<br>

1. 위 Ruby 링크에서 Ruby를 다운로드 받아주세요.
![Desktop View](/assets/img/2022-08-13/7.png){: width="100%" } 
<br>
<br>
<br>

2. 좌측 하단 윈도우 검색창에 ruby를 입력하여 `Start Command Prompt with Ruby`를 실행 후 아래 명령어를 차례대로 실행합니다.
<br>
<br>

    아래는 저의 경로입니다. 이전 단계에서 Clone한 경로로 이동하세요.
    ```console
    cd C:\blog\08genie.github.io
    ```
    <br>

    만약 ruby 버전이 3.0 이상이라면 webrick을 설치해줍니다.
    ```console
    $ gem install webrick
    ```
    <br>

    ruby에 jekyll 을 설치해줍니다.
    ```console
    $ gem install jekyll bundler
    ```
    <br>

    jekyll 생성해줍니다. 만약 아래 코드 실행 시 {Clone폴더} is not empty 에러가 뜬다면 해당 폴더에서 .git 폴더를 제외한 모든 파일을 삭제 후 다시 실행해주세요.
    ```console
    $ jekyll new ./
    ```
    <br>

    서로 참조관계가 있는 파일을 묶어줍니다.
    ```console
    $ bundle install
    ```
    <br>

    만약 ruby 버전이 3.0 이상이라면 아래 코드를 실행해주세요. ruby 3.0 version 부터는 gem에 webrick이 포함되지 않는다고 합니다.
    ```console
    $ bundle add webrick
    ```
    <br>
    
    jekyll 서버를 작동시킵니다.
    ```console
    $jekyll serve
    ```
    모두 실행 완료 되었다면 [**http://127.0.0.1:4000**](http://127.0.0.1:4000) 으로 접속 가능합니다.
<br>
<br>
<br>

3. jekyll template 사이트에서 마음에 드는 테마를 고른 후 Download 버튼을 클릭하여 다운로드 하거나 Homepage 버튼 클릭후 Github를 통해 다운로드 합니다. 그 후 이전 단계에서 Clone 한 경로에 모두 붙여넣기(덮어씌우기) 합니다.
![Desktop View](/assets/img/2022-08-13/8.png){: width="100%" } 
<br>
<br>
<br>

## Step 4. GitHub에 반영
---
1. Chirpy 테마를 초기화 시켜주기 위해 아래 파일들을 삭제합니다.
    - Gemfile.lock
    - index.markdown
    - .travis.tml
    - _posts.docs(참고할만한 것은 나중에 지워도 됩니다.)
    - .github 폴더에서 workflows 폴더를 제외한 나머지 파일을 전부 지웁니다.
    - workflows에서 commitlint.yml과 page-deploy.yml.hook을 제외한 나머지 파일을 전부 지웁니다.
    - page-deploy.hook파일의 .hook을 지웁니다.
<br>
<br>
<br>

2. Clone 폴더에 config.yml을 실행하고 url에 Github pages 주소를 넣어줍니다.
![Desktop View](/assets/img/2022-08-13/9.png){: width="100%" }
<br>
<br>
<br>

3. Clone 폴더에 .github/workflows/pages-deploy.yml 파일을 열고 branches를 main으로 변경해주고 ruby-version도 저는 3.1이기 때문에 3.1로 변경해줍니니다.
![Desktop View](/assets/img/2022-08-13/10.png){: width="100%" }
<br>
<br>
<br>

4. 다시 `Start Command Prompt with Ruby`을 실행해 bundler를 실행합니다.
```console
$ bundle install
```
<br>
<br>

5. 이제 Github에 변경사항을 반영해보겠습니다. Github Desktop을 실행하면 왼쪽 Changes바에 변경된 파일의 목록이 뜨고 아래 부분에 commit 메지시를 입력하면 `commit to main` 버튼이 활성화 됩니다. 버튼 클릭 후 오른쪽 위 `Push origin` 버튼 클릭까지 완료해야 나의 github reporitory에서 확인 가능합니다. 
![Desktop View](/assets/img/2022-08-13/11.png){: width="100%" } 
<br>
<br>
<br>

6. 본인의 Github계정(https://github.com/{username})에 접속하여 위 Step 1-3 과 같은 경로에서 Branch를 gh-pages(jekyll 테마를 Github에 Commit 하면 생섬됨)로 변경해 주세요.
![Desktop View](/assets/img/2022-08-13/12.png){: width="100%" } 
<br>
<br>
마지막으로 Github Page 주소인 `https://{username}.github.io` 에 변경 사항이 적용 되었다면 끝!






