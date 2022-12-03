---
title: "[AWS] 스프링부트(Spring Boot) AWS EC2 war 배포하기 (3) - FileZilla를 이용한 Spring Boot war 파일 배포"
author: genie
date: 2022-12-02 21:35:10 +0900
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

## war 파일 빌드
---
1. 프로젝트 우클릭 > ``Export`` 를 클릭합니다.
![Desktop View](/assets/img/2022-12-02/1.png){: width="100%" }
<br>
<br>
<br>
2. Web > War file 을 선택 후 ``Next`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-12-02/2.png){: width="100%" }
<br>
<br>
<br>

3. ``Browse`` 버튼을 클릭하여 war 파일을 저장할 경로를 선택 하고 파일이름을 ``ROOT``로 작성하여 ``저장`` 후 ``Finish`` 버튼을 클릭하면 해당 경로에 war 파일이 생성된 것을 볼 수 있습니다.
![Desktop View](/assets/img/2022-12-02/3.png){: width="100%" }
<br>
<br>
<br>

## war 파일 배포
---
**Notice** :  FTP 툴인 [**파일질라(FileZilla)**](https://filezilla-project.org/download.php?type=client){: target="_blank"}를 다운받아주세요.

1. 파일질라를 실행 하여 왼쪽 상단의 파일 > 사이트 관리자를 클릭 후 아래와 같이 FTP 정보를 입력 하고 ``확인`` 버튼을 클릭합니다. <br><br>
 ex) 신청 아이디 : genie
 - 프로토콜   : SFTP - SSH File Transfer Protocol
 - 호스트     : AWS 해당 인스턴스 퍼블릭 IPv4 DNS
 - 로그온유형 : 키 파일
 - 사용자     : ubuntu
 - 키 파일    : ``찾아보기`` 버튼을 클릭하여 인스턴스 생성에 사용된 ppk 키파일을 선택해주세요.
![Desktop View](/assets/img/2022-12-02/4.png){: width="100%" }
<br>
<br>
<br>

2. 빌드했던 ROOT.war 파일의 경로를 찾아 리모트 사이트 /home/ubuntu/apache-tomcat-9.0.69/webapps 폴더 안에 끌어서 넣어 줍니다. 잠시 후 새로 고침하면 아래와 같이 ROOT 폴더도 자동으로 생성 되는 것을 볼 수 있습니다.
![Desktop View](/assets/img/2022-12-02/5.png){: width="100%" }
<br>
<br>
<br>

3. PuTTY 에 접속하여 tomcat bin 폴더 위치에서 톰캣 실행 후 퍼블릭 IPv4 DNS 또는 IP 주소를 통해 접속하면 화면이 정상적으로 뜨는 것을 확인할 수 있습니다.
ex) 퍼블릭 IPv4 DNS:8080
```console
cd apache-tomcat-9.0.69/bin
```
    > 혹시 bin 폴더로 접근이 안된다면 root 계정으로 접근해보세요!
    ```console
    sudo su //root 계정 접속
    ```
    {: .prompt-tip }  
```console
./startup.sh 
```
톰캣 실행 : ./startup.sh - 톰캣 종료 : ./shutdown.sh
![Desktop View](/assets/img/2022-12-02/6.png){: width="100%" }   
<br>
<br>
<br>

## port 포워딩
---
포트 포워딩이란 외부 아이피 포트번호와 내부 아이피 포트번호를 연결해주는 기능입니다. 별도의 설정 없이 외부 아이피가 접속을 시도할 때, 내부에 어떤 프로세스(서비스) 또는 기기와 연결할 지 알 수 없기 때문에 접근이 불가능합니다. 그래서 특정 프로세스(서비스) 또는 기기에 접근하기 위해 포트 포워딩을 통해 외부 아이피 특정 포트로 접속하면 내부 아이피 특정 포트로 맵핑해줍니다.
<br>

AWS EC2 애플리케이션에 IP를 통해 접근하려면 IP 뒤에 톰캣의 포트(8080)를 붙여야 접속이 가능합니다.<br>
ex) 1.111.111.111:8080<br>
만약 80 포트를 8080 포트로 포워딩 하지 않고 아래와 같이 IP로 접속을 시도하면 접속이 불가능합니다.<br>
ex) 15.162.211.192<br>
따라서 외부 80 포트를 통해 내부 8080 포트로 접근 가능하도록 포워딩 해야합니다.
```console
sudo su //root 계정 접속
```
80 포트로 접속시 8080 포트로 포워딩
```
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```
<br>
<br>

port 포워딩까지 마치고 나면 주소창에 8080 포트 번호를 입력 해주지 않아도 ``퍼블릭 IPv4 DNS 또는 IP`` 주소만으로 접속 가능합니다.
<br>
<br>
<br>

<div style="font-weight:bold; font-size:1.2rem;">스프링부트(Spring Boot) AWS EC2 war 배포하기 시리즈</div>
---
[스프링부트(Spring Boot) AWS EC2 war 배포하기 (1) - 인스턴스 생성 및 설정](https://08genie.github.io/posts/aws-ec2-springboot-deploy-1/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (2) - PuTTY를 이용한 Ubuntu java , tomcat 설치](https://08genie.github.io/posts/aws-ec2-springboot-deploy-2/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (3) - FileZilla를 이용한 Spring Boot war 파일 배포](https://08genie.github.io/posts/aws-ec2-springboot-deploy-3/)
