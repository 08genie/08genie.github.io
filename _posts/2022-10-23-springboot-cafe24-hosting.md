---
title: "[Cafe24] 스프링부트(Spring Boot) 카페24(cafe24) 호스팅"
author: genie
date: 2022-10-23 22:17:10 +0900
categories: [호스팅, Cafe24]
tags: [스프링부트, springboot, 호스팅, 완벽정리, cafe24 호스팅, How to, Study]
---

## 카페24(Cafe24) 호스팅 신청
---

**Notice**: [**Cafe24 호스팅**](https://hosting.cafe24.com/){: target="_blank"}에 가입해주세요.
<br>

1. 먼저  [**https://hosting.cafe24.com/**](https://hosting.cafe24.com/){: target="_blank"} 으로 접속 하여 로그인 한 후 아래와 같이 호스팅 > 개발 언어별 호스팅 메뉴를 클릭합니다.
![Desktop View](/assets/img/2022-10-23/1.png){: width="100%" }
<br>
<br>
<br>

2. 탭 메뉴에 기본으로 Tomcat JSP가 선택되어있습니다. 선택 되어진 상태로 자신의 프로젝트에 적절한 웹용량과 트래픽 용량을 확인 하고 신청하기 버튼을 클릭합니다. 
![Desktop View](/assets/img/2022-10-23/2.png){: width="100%" }
<br>
<br>
<br>

3. FTP, SSH, DB 비밀번호를 입력 다음 버튼을 클릭합니다. 설정해준 비밀번호를 잘 기억해두세요! 코드를 수정하여 다시 서버에 올리거나 DB 관리를 관리 하거나 할때 계속 쓰이게 되는 비밀번호 입니다.
    >  카페24 에서 제공하는 무료도메인은  ``신청아이디.cafe24.com``과 같은 형태를 가집니다. 만약 본인의 카페24 아이디가 아닌 다른 신청 아이디를 원한다면 아래 사진에서 검정박스로 표시해 놓은것과 같이 신규 아이디 탭을 클릭하여 신청하시면 됩니다.
    {: .prompt-tip }
![Desktop View](/assets/img/2022-10-23/3.png){: width="100%" }
<br>
<br>
<br>

4. 결제 완료 후 메인 페이지에서 ``나의서비스관리`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-10-23/4.png){: width="100%" }
<br>
<br>
<br>

5. 내가 신청한 아이디 목록을 선택 하면 해당 아이디의 호스팅 관리 페이지를 확인 할 수 있습니다.
![Desktop View](/assets/img/2022-10-23/5.png){: width="100%" }
<br>
<br>
<br>

## DB 설정과 접속방법
---
1. (DB 사용하지 않으면 생략가능) Tomcat JSP 호스팅에서는 기본적으로  Maria DB를 제공합니다. 카페24에서 제공하는 DB를 사용하기 위해 MySQL 외부 IP 접근설정(나의서비스관리 > 호스팅관리 > 서비스 사용현황) 에 ``설정하기`` 버튼을 클릭합니다. 3단계에서 설정했던 비밀번호를 입력 후 접근하고자 하는 IP주소를 등록하면 외부 IP에서 접근 가능합니다. 
    > 내 아이피 주소는 [**https://www.findip.kr/**](https://www.findip.kr/){: target="_blank"} 에서 확인 가능 합니다.
    {: .prompt-tip }
![Desktop View](/assets/img/2022-10-23/6.png){: width="100%" }
<br>
<br>
<br>

2. DB 관리 툴(MySQL Workbench , Heidisql ...) 에서 DB 접속 시 아래와 같이 입력하여 접속 가능 합니다.<br>
 ex) 신청 아이디 : genie
 - 호스트명/IP     : 카페24에서 부여받은 호스트명 입력 (ex genie.cafe24.com)
 - 사용자/userName : genie
 - 암호            : 이전 단계에서 설정한 비밀번호 
 <br>
 <br>
 <br>

 3. Spring Boot 프로젝트 설정 방법
    ```yml
    ...생략

    spring:
    mvc:
        view:
        prefix: /WEB-INF/views/
        suffix: .jsp
    datasource:
        hikari:
        username: 신청 아이디
        password: 이전 단계에서 설정한 비밀번호
        jdbc-url: jdbc:mariadb://localhost/db이름?characterEncoding=UTF-8&serverTimezone=UTC&useUnicode=true&allowMultiQueries=true
        driver-class-name: org.mariadb.jdbc.Driver
        type: com.zaxxer.hikari.HikariDataSource
        connection-test-query: SELECT 1 FROM DUAL
        maximum-pool-size: 10
        minimum-idle: 5
        idle-timeout: 10000
        connection-timeout: 10000
        validation-timeout: 10000
        max-lifetime: 30000
        
    ...생략
    ```
    {: file='application.yml'}
<br>
<br>
<br>

## 스프링부트(Spring Boot) 프로젝트 배포
---
**Notice** :  FTP 툴인 [**파일질라(FileZilla)**](https://filezilla-project.org/download.php?type=client){: target="_blank"}를 다운받아주세요.
<br>

1. 먼저 프로젝트를 우클릭 후 ``Export``를 클릭하고 아래와 같이 Web > WAR file 을 선택 후 ``next`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-10-23/7.png){: width="100%" }
<br>
<br>
<br>

2. ``Browse`` 버튼을 클릭하여 프로젝트를 저장할 경로를 선택 하고 파일이름을 ``ROOT``로 작성하여 ``저장`` 후 ``Finish`` 버튼을 클릭합니다. 
![Desktop View](/assets/img/2022-10-23/8.png){: width="100%" }
<br>
<br>
<br>

3. 파일질라를 실행 하여 왼쪽 상단의 파일 > 사이트 관리자를 클릭 후 아래와 같이 FTP 정보를 입력 하고 ``확인`` 버튼을 클릭합니다. <br><br>
 ex) 신청 아이디 : genie
 - 프로토콜   : SFTP - SSH File Transfer Protocol
 - 호스트     : 카페24에서 부여받은 호스트명 입력 (ex genie.cafe24.com)
 - 사용자     : genie
 - 비밀번호   : 이전 단계에서 설정한 비밀번호 
![Desktop View](/assets/img/2022-10-23/9.png){: width="100%" }
<br>
<br>
<br>

4. 이전 단계에서 저장했던 ROOT.war 파일의 경로를 찾아 리모트 사이트 tomcat > webapps 폴더 안에 끌어서 넣어 줍니다. 잠시 후 새로 고침하면 아래와 같이 ROOT 폴더도 자동으로 생성 되는 것을 볼 수 있습니다.
![Desktop View](/assets/img/2022-10-23/10.png){: width="100%" }
<br>
<br>
<br>

5. 카페24 호스팅 홈페이지로 돌아와 ``톰캣매핑/재시작`` 메뉴에서 ``재시작`` 버튼을 클릭 하면 배포 완료! **신청아이디.cafe24.com** 으로 접속하여 확인 가능 합니다.
![Desktop View](/assets/img/2022-10-23/11.png){: width="100%" }
<br>
<br>
<br>

## 스프링부트(Spring Boot) 카페24(cafe24) 호스팅 에러 해결
---
[[Cafe24] 스프링부트(Spring Boot) 카페24(cafe24) 호스팅 404,500 에러(error)](https://08genie.github.io/posts/springboot-cafe24-hosting-error/)