---
title: "[MySQL] Window 에서 MySQL 설치하기"
author: genie
date: 2022-08-21 20:30:10 +0900
categories: [Database, MySQL]
tags: [MySQL, DB, How to, Study]
---

## MySQL이란?
---
MYSQL은 오라클이 지원하는 가장 널리 사용되고 있는 오픈소스의 관계형 데이터베이스 관리 시스템(RDBMS) 입니다.
다양한 운영체제에서 사용 가능하고 여러가지의 프로그래밍 언어를 지원합니다. 또한 사용하기 용이하며 크기가 큰 데이터 집합도 빠르고 효과적으로 처리할 수 있습니다.
<br>
<br>

## Step 1. MySQL 다운로드
---
**Download** : MySQL([**https://dev.mysql.com/downloads/mysql/**](https://dev.mysql.com/downloads/mysql/))
<br>

1. 위 링크에서 MySQL 홈페이지에 접속하고 아래 ``Go to Download Page`` 버튼을 클릭합니다.
![Desktop View](../../assets/img/2022-08-21/1.png){: width="100%" }
<br>
<br>
<br>

2. 아래와 같이 ``Download`` 버튼을 클릭합니다. 
![Desktop View](/assets/img/2022-08-21/2.png){: width="100%" }
<br>

<br>
<br>

## Step 2. MySQL 설치
---

1. 다운로드한 파일을 실행 후 설치 유형을 선택할 수 있는데 필요한것들만 선택하여 설치하기 위해 아래와 같이 ``Custom``을 선택하고 Next 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-21/3.png){: width="100%" }
<br>
<br>
<br>


2. 설치 할 제품들을 아래와 같이 선택 후 화살표를 클릭하여 우측의 Products To Be Installed 로 이동시키고 ``Next`` 버튼을 클릭합니다.
<br>
[MySQL SErvers] - [MySQL Server 8.0] - [MySQL SErver 8.0.30]
<br>
[Applications] - [MySQL Workbench] - [MySQL Workbench 80] - [MySQL Workbench 8.0.30 -X64]
<br>
[Documentation] - [Samples and Examples] - [Samples and Examples 8.0] - [Samples and Examples 8.0.30 X86]
![Desktop View](/assets/img/2022-08-21/4.png){: width="100%" } 
<br>
<br>
<br>

3. 이전 단계에서 선택한 3개의 항목을 확인하고 ``Execute`` 버튼을 클릭해 설치를 진행합니다.
![Desktop View](/assets/img/2022-08-21/5.png){: width="100%" } 
<br>
<br>
<br>

4. 설치가 완료 되면 ``Next`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-21/6.png){: width="100%" } 
<br>
<br>
<br>

5. 아래 항목의 환경 설정이 필요합니다. ``Next`` 버튼을 클릭해주세요.
![Desktop View](/assets/img/2022-08-21/7.png){: width="100%" } 
<br>
<br>
<br>

6. ``Higth Availability`` 항목이 나오면 ``Standalone MySQL Server / Classic MySQL Replication`` 이 선택된 상태에서 ``Next`` 버튼을 클릭하고 ``Type and Networking``에서 아래와 같이 Config Type을 ``Development Computer``로 선택하고 Connectivity를 아래와 같이 맞춘 후 ``Next`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-21/8.png){: width="100%" } 
<br>
<br>
<br>

7. 아래와 같이 ``Use Legacy Authentication Method (Retain MySQL 5.x Compatibility)``를 선택후 ``Next`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-21/9.png){: width="100%" } 
<br>
<br>
<br>

8. MySQL 관리자의 비밀번호를 설정 후 ``Next`` 버튼을 클릭합니다.
![Desktop View](../../assets/img/2022-08-21/10.png){: width="100%" } 
<br>
<br>
<br>

9. ``Windows Service`` 항목은 그대로 ``Next`` 버튼을 클릭하고 아래 항목들을 적용하기 위해 ``Execute`` 버튼을 클릭 후 완료되면 ``Finish``버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-21/11.png){: width="100%" } 
<br>
<br>
<br>

10. ``Product Configuration`` 항목에서 ``Next`` 버튼을 클릭하고 ``Connect To Server``에서 이전단계에서 설정한 비밀번호를 입력하고 ``Check`` 버튼을 클릭 후 ``Next`` 버튼을 클릭합니다. 
![Desktop View](/assets/img/2022-08-21/12.png){: width="100%" } 
<br>
<br>
<br>

11. ``Execute``버튼을 클릭하여 설정된 내용을 적용시키고 ``Finish``버튼을 클릭해 종료합니다.
![Desktop View](/assets/img/2022-08-21/13.png){: width="100%" } 
<br>
<br>
<br>

12. 다시 ``Product Configuration`` 항목에서 ``Next`` 버튼을 클릭하고 아래와 같이 ``Start MySQL Workbench after setup``을 체크하고 ``Finish`` 버튼을 클릭하면 설치가 완료됩니다.
![Desktop View](/assets/img/2022-08-21/14.png){: width="100%" } 
<br>
<br>
<br>

## Step 3. MySQL 정상작동 확인
---
1. 왼쪽 하단 검색창에서 mysql을 입력하여 MYSQL Workbench를 실행 후 아래와 같이 localhost를 클릭합니다. 이전 단계에서 설정한 비밀번호를 입력고 ``OK`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-08-21/15.png){: width="100%" } 
<br>
<br>
<br>

2. 서버에 접속된 화면으로 넘어가면 정상입니다. 끝!
![Desktop View](/assets/img/2022-08-21/16.png){: width="100%" }