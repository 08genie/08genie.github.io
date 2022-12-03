---
title: "[AWS] 스프링부트(Spring Boot) AWS EC2 war 배포하기 (2) - PuTTY를 이용한 Ubuntu java , tomcat 설치"
author: genie
date: 2022-12-01 20:48:10 +0900
categories: [호스팅]
tags: [aws, war, ec2, deploy, java, tomcat, ubuntu]
---

<div style="font-weight:bold; font-size:1.2rem;">스프링부트(Spring Boot) AWS EC2 war 배포하기 시리즈</div>
---
[스프링부트(Spring Boot) AWS EC2 war 배포하기 (1) - 인스턴스 생성 및 설정](https://08genie.github.io/posts/aws-ec2-springboot-deploy-1/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (2) - PuTTY를 이용한 Ubuntu java , tomcat 설치](https://08genie.github.io/posts/aws-ec2-springboot-deploy-2/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (3) - FileZilla를 이용한 Spring Boot war 파일 배포](https://08genie.github.io/posts/aws-ec2-springboot-deploy-3/)

<br>
<br>

## PuTTY 접속
---
1. [PuTTY](https://putty.softonic.kr/)를 다운로드 한 후 실행합니다. 
![Desktop View](/assets/img/2022-12-01/1.png){: width="100%" }
<br>
<br>
<br>

2. 왼쪽 Category 에서 Connection > SSH > Auth 를 선택 후 ``Browse`` 버튼을 클릭 해 이전에 저장 했었던 ppk 키 페어 파일을 불러와주세요. 
![Desktop View](/assets/img/2022-12-01/2.png){: width="80%" }
<br>
<br>
<br>

3. AWS 인스턴스 정보에 있는 퍼블릭 ``IPv4 DNS`` 주소를 복사합니다.
![Desktop View](/assets/img/2022-12-01/3.png){: width="100%" }
<br>
<br>
<br>

4. 왼쪽 Category 에서 Session 메뉴 선택 후 Host Name for IP address 에 이전 단계에서 복사했던 주소를 붙여넣기 하고 ``Open`` 버튼을 클릭합니다. 
    > ``Open`` 버튼을 클릭하기 전 Saved Sessions 에 IP 정보를 저장할 이름을 입력해주고 Save 버튼을 누르면 IP 정보가 저장되어 다음 접속시 편리하게 사용 할 수 있습니다.
    {: .prompt-tip }
![Desktop View](/assets/img/2022-12-01/4.png){: width="80%" }
<br>
<br>
<br>

5. login as 에 ``ubuntu`` 를 입력 후 엔터를 누르면 접속이 완료 됩니다. 
![Desktop View](/assets/img/2022-12-01/5.png){: width="100%" }
<br>
<br>
<br>

## java 설치
---
1. 사용 가능한 패키지와 버전의 리스트를 업데이트 합니다. (최신 버전이 있는지 확인)
```console
sudo apt-get update
```
```console
sudo apt-get upgrade
```
<br>
<br>
<br>

2. java 8 버전을 설치합니다.
```console
sudo apt-get install openjdk-8-jdk
```
<br>
<br>
<br>

3. java 가 제대로 설치 되었는지 확인 합니다.
```console
java -version
```
```
javac -version
```
![Desktop View](/assets/img/2022-12-01/6.png){: width="100%" }
<br>
<br>
<br>

> 혹시라도 여러개의 Java가 설치되어 있는 경우 기본 버전을 변경하기 위해 아래와 같이 업데이트 대체 도구를 사용합니다. (처음 설치로 Java가 한개 이면 생략)
```console
sudo update-alternatives --config java
```
명령어를 입력하면 현재 설치 되어있는 자바의 목록이 나옵니다. 그중 기본 버전으로 변경하고 싶은 번호를 입력 해주면 변경됩니다.
{: .prompt-tip }
<br>
<br>
<br>

## java 환경 변수 등록
---
1. 아래와 같이 명령어를 입력하여 설치된 자바 경로를 찾아 /jre/bin/java를 제외한 부분을 복사합니다.
```console
update-alternatives --list java
```
![Desktop View](/assets/img/2022-12-01/7.png){: width="100%" }
<br>
<br>
<br>

2. 아래와 같이 명령어를 통해 bashrc 파일을 열어줍니다.
```console
vim ~/.bashrc
```
<br>
<br>
<br>

3. a 또는 i 입력 하여 입력모드로 넘어 간 후 맨 아래 쪽에 아래와 같이 환경 변수를 등록해 줍니다.
```console
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64      // 1.에서 복사한 나의 자바 경로
export PATH=${PATH}:${JAVA_HOME}/bin
```
![Desktop View](/assets/img/2022-12-01/8.png){: width="100%" }
<br>
<br>
<br>

4. :wq 또는 wq! 명령어를 입력해 저장 후 종료 합니다. (q 또는 q! 그냥 종료 - 저장X)
<br>
<br>
<br>

5. 새로 설정한 환경 변수 설정을 적용하기 위해 source 명령어로 적용 시킵니다.
```console
source ~/.bashrc
```
<br>
<br>
<br>

6. 내가 설정 한 경로로 환경 변수가 잘 등록 되었는지 확인합니다.
```console
echo $JAVA_HOME
```
![Desktop View](/assets/img/2022-12-01/9.png){: width="100%" }
<br>
<br>
<br>

## tomcat 설치
---
1. [Apache Tomcat](https://tomcat.apache.org/download-90.cgi){: target="_blank"}으로 접속해 아래와 같이 tar.gz 위에서 마우스 오른쪽 버튼을 클릭해 ``링크 주소 복사``를 눌러줍니다.
![Desktop View](/assets/img/2022-12-01/10.png){: width="100%" }
<br>
<br>
<br>

2. 톰캣을 다운 받습니다.
```console
wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.69/bin/apache-tomcat-9.0.69.tar.gz   //복사한 링크 붙여넣기
```
<br>
<br>
<br>

3. 다운로드가 완료 되면 ls 명령어를 통해 tomcat 파일이 잘 다운 되었는지 확인 합니다. 중간 중간 파일을 다운 받거나 압축 또는 해제 후 파일을 확인 하고자 할 때에는 ls 또는 ll 명령어로 확인해주세요.
```console
ls
```
![Desktop View](/assets/img/2022-12-01/11.png){: width="100%" }

4. 아래 명령어를 통해 압축을 해제 후 ls 를 통해 정상적으로 압축 해제 되었는지 확인하세요.
```console
tar -zvxf apache-tomcat-9.0.69.tar.gz
```
<br>
<br>
<br>

## 방화벽 설정 (8080 포트 열기)
---
1. 외부에서 8080 포트 접근 허용을 위해 방화벽 포트를 열어 주어야 합니다.
```console
sudo ufw allow from any to any port 8080 proto tcp
```
<br>
<br>
<br>

<div style="font-weight:bold; font-size:1.2rem;">스프링부트(Spring Boot) AWS EC2 war 배포하기 시리즈</div>
---
[스프링부트(Spring Boot) AWS EC2 war 배포하기 (1) - 인스턴스 생성 및 설정](https://08genie.github.io/posts/aws-ec2-springboot-deploy-1/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (2) - PuTTY를 이용한 Ubuntu java , tomcat 설치](https://08genie.github.io/posts/aws-ec2-springboot-deploy-2/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (3) - FileZilla를 이용한 Spring Boot war 파일 배포](https://08genie.github.io/posts/aws-ec2-springboot-deploy-3/)
