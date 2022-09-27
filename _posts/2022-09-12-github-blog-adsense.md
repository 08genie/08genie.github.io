---
title: "[Github Blog] 구글 서치콘솔(Search Console) & 애널리틱스(Analytics) & 애드샌스(Adsense)"
author: genie
date: 2022-09-12 21:46:10 +0900
categories: [GitHub, Blog]
tags: [gitHub blog, gitHub pages, 애드샌스, 서치콘솔, 애널리틱스, serarch console, analytics, adsense, How to, study]
---

## Google Search Console
---
Google Search Console이란 ? 나의 웹사이트(블로그) 포스팅이 구글(Google) 사이트 내 검색 기능을 통해 검색이 가능 하도록 해주는 서비스 입니다.
<br>
<br>

1. 먼저 [**Google Search Console**](https://search.google.com/search-console)로 이동하여 시작하기 버튼을 클릭하고 아래와 같이 URL 접두어에 내 블로그 주소를 입력 후 ``계속`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-12/1.png){: width="100%" }
<br>
<br>

2. 아래와 같이 ① html 파일 클릭하여 다운로드 한 뒤 ② 블로그 작업폴더에서 최상위 폴더인 index.html이 있는 위치에 다운로드한 html파일을 넣어 줍니다. Github Desktop을 이용해 commit과 push를 해준 후 서치콘솔 페이지로 돌아와 ③ 확인 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-12/2.png){: width="100%" }
<br>
<br>
<br>

3. 소유권이 확인되었다면 내가 쓴 포스팅이 Google이 읽을 수 있도록 추가적인 작업이 필요합니다. 블로그 작업폴더로 돌아와 이전 단계와 같은 위치에서 Gemfile을 열어 맨 아래 부분에 문구를 추가해줍니다.
```
    gem 'jekyll-sitemap'
```
<br>
<br>

4. ``Start Command Prompt with Ruby``를 실행 후 블로그 작업폴더로 이동 한 뒤 아래 명령어를 입력해줍니다.
```
    bundle install
```
<br>
<br>

5. 잠시 후 아래와 같이 jekyll-sitemap이 install 된 것을 확인 할 수 있습니다.
![Desktop View](/assets/img/2022-09-12/3.png){: width="100%" }
<br>
<br>
<br>

6. 아래의 명령어를 통해 서버를 실행시키고 [**http://localhost:4000/sitemap.xml**](http://localhost:4000/sitemap.xml)로 접속 합니다. 사이트 맵이 잘 뜬다면 성공! (페이지가 로딩되지 않는다면 잠시 후 다시 시도해주세요)
```
jekyll serve
```
<br>
<br>

7. (jekyll 사용자는 생략 가능 합니다. 다음 단계로 넘어가주세요) jekyll 플러그인을 사용하지 않는 github_pages 사용자는 직접 sitemap.xml 파일을 생성해주어야 합니다. 이전 단계와 동일한 index.html이 있는 위치에 sitemap.xml 파일을 만들고 아래 내용을 복사해 넣습니다.

    ```
    {% raw %}
    ---
    layout: null
    ---

    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {% for post in site.posts %}
        <url>
            <loc>{{ site.url }}{{ post.url }}</loc>
            {% if post.lastmod == null %}
            <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
            {% else %}
            <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
            {% endif %}

            {% if post.sitemap.changefreq == null %}
            <changefreq>weekly</changefreq>
            {% else %}
            <changefreq>{{ post.sitemap.changefreq }}</changefreq>
            {% endif %}

            {% if post.sitemap.priority == null %}
            <priority>0.5</priority>
            {% else %}
            <priority>{{ post.sitemap.priority }}</priority>
            {% endif %}

        </url>
        {% endfor %}
    </urlset>
    {% endraw %}
    ```
    {: file='/sitemap.xml'}
<br>
<br>

8. 마지막으로 이전 단계와 동일한 index.html이 있는 위치에 robots.txt 파일을 생성 한 뒤 아래와 같이 내 블로그 주소를 넣고 작성해줍니다.
```
    User-agent: *
    Allow: /

    Sitemap: https://08genie.github.io/sitemap.xml
```
<br>
<br>

9. Github Desktop에서 commit과 push를 진행해 주고 [**Google Search Console**](https://search.google.com/search-console)의 Sitemap으로 들어가 아래와 같이 sitemap.xml을 입력하여 ``제출`` 버튼을 클릭하면 7일 이내로 검색 엔진에 노출됩니다.
![Desktop View](/assets/img/2022-09-12/4.png){: width="100%" }
<br>
<br>
<br>

## Google Analytics
---
Google Analytics란 ? 나의 웹사이트(블로그)에 누가, 언제 , 얼마나 접속하였는지 여러 요소들을 분석해주는 서비스 입니다.
<br>
<br>

1. 먼저 [**Google Analytics**](https://analytics.google.com/analytics/)로 이동 후 첫화면에서 ``측정 시작`` 버튼을 클릭합니다. 
![Desktop View](/assets/img/2022-09-12/5.png){: width="100%" }
<br>
<br>
<br>

2. 계정 설정 단계에서 계정 이름을 적어주고 ``다음`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-12/6.png){: width="100%" }
<br>
<br>
<br>

3. 속성 설정에서 내 블로그 주소를 넣어준 후 보고 시간대와 통화를 대한민국으로 맞추고 ``고급 옵션 보기`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-12/7.png){: width="100%" }
<br>
<br>
<br>

4. 웹사이트의 URL에 내 블로그 주소를 넣어 준 후 ``다음`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-12/8.png){: width="100%" }
<br>
<br>
<br>

5. 비즈니스 정보는 중요하지 않으니 대략 입력해주시고 ``다음`` 버튼을 클릭하여 약관 언어를 대한민국으로 설정 후 동의 진행해줍니다.
![Desktop View](/assets/img/2022-09-12/9.png){: width="100%" }
<br>
<br>
<br>

6. 애널리틱스 홈화면에서 왼쪽 하단 ``관리`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-09-12/10.png){: width="100%" }
<br>
<br>
<br>

7. ``추적 코드`` 버튼을 클릭후 추적 ID를 복사합니다.
![Desktop View](/assets/img/2022-09-12/11.png){: width="100%" }
<br>
<br>
<br>

8. jekyll-theme-chirpy 테마 에서는 _config.yml파일에서 Google Analytics 설정 할 수 있습니다. 마지막으로 _config.yml파일을 열어 아래와 같이 해당 부분에 값을 입력 후 Github Desktop에서 commit과 push를 진행합니다.
```yml
    google_analytics:
    id: 'UA-*********-1'
```
<br>
<br>
<br>

## Google Adsense
---
Google Adsense란 ? 웹사이트(블로그)의 소유자가 자신의 웹 페이지에 구글이 선정한 광고를 올려 수익을 얻을 수 있도록 하는 서비스 입니다.
<br>
<br>

1. 먼저 [**Google Adsense**](https://www.google.co.kr/adsense/start/)로 이동 후 첫화면에서 ``시작`` 버튼을 클릭 합니다. 그 후 왼쪽 ``정보 입력`` 버튼을 클릭하여 정보를 입력하고 입력 완료 후 오른쪽 ``시작하기`` 버튼을 클릭합니다. 
![Desktop View](/assets/img/2022-09-12/12.png){: width="100%" }
<br>
<br>
<br>

2. 구글 애드센스 script 코드를 복사하여 블로그 작업폴더 > _includes > head.html 파일에 <head> 태그 안 마지막 부분에 붙여 넣어 줍니다.
```html
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6399446934234400"
    crossorigin="anonymous"></script>
```
<br>
<br>

3. 마지막으로 Github Desktop 을 통해 commit과 push를 진행해주고, 다시 애드센스 메인 페이지로 돌아가면 ``사이트 광고 게재 가능 여부 검토 중``임을 확인 할 수 있습니다. 보통 승인까지는 1~14일 정도가 소요된다고 합니다.