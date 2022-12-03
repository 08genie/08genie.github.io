---
title: "[AWS] 스프링부트(Spring Boot) AWS EC2 war 배포하기 (1) - 인스턴스 생성 및 설정"
author: genie
date: 2022-11-30 21:08:10 +0900
categories: [호스팅]
tags: [aws, war, ec2, deploy, instance]
---

<div style="font-weight:bold; font-size:1.2rem;">스프링부트(Spring Boot) AWS EC2 war 배포하기 시리즈</div>
---
[스프링부트(Spring Boot) AWS EC2 war 배포하기 (1) - 인스턴스 생성 및 설정](https://08genie.github.io/posts/aws-ec2-springboot-deploy-1/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (2) - PuTTY를 이용한 Ubuntu java , tomcat 설치](https://08genie.github.io/posts/aws-ec2-springboot-deploy-2/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (3) - FileZilla를 이용한 Spring Boot war 파일 배포](https://08genie.github.io/posts/aws-ec2-springboot-deploy-3/)

<br>
<br>

## 인스턴스 생성
---
1. 회원가입 > 로그인 > 카드 등록까지 완료 후 오른쪽 상단의 리전을 ``서울``로 변경 합니다.
![Desktop View](/assets/img/2022-11-30/1.png){: width="100%" }
<br>
<br>

2. 왼쪽 상단의 검색창에서 ec2를 검색하여 아래와 같이 ``EC2`` 서비스를 클릭합니다.
![Desktop View](/assets/img/2022-11-30/2.png){: width="100%" }
<br>
<br>
<br>

3. EC2 대시보드에서 ``인스턴스 시작`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-11-30/3.png){: width="100%" }
<br>
<br>
<br>

4. 생성하고자하는 인스턴스 이름을 작성합니다.
![Desktop View](/assets/img/2022-11-30/4.png){: width="100%" }
<br>
<br>
<br>

5. OS 이미지를 선택 합니다. 저는 Ubuntu를 선택했습니다.
![Desktop View](/assets/img/2022-11-30/5.png){: width="100%" }
<br>
<br>
<br>

6. 인스턴스 유형을 선택합니다. 
![Desktop View](/assets/img/2022-11-30/6.png){: width="100%" }
<br>
<br>
<br>

7. 키페어란 EC2 서버 접속을 위한 인증서로, 기존 키페어가 있다면 선택하고 없으면 아래와 같이 ``새 키 페어 생성``을 클릭합니다.
![Desktop View](/assets/img/2022-11-30/7.png){: width="100%" }
<br>
<br>
<br>

8. 키 페어 이름을 입력 후 아래와 같이 프라이빗 키 파일 형식을 ``.ppk``로 설정해주고 ``키 페어 생성`` 버튼을 클릭합니다. (저장된 키 페어는 꼭 잘 ! 보관해주세요.)
![Desktop View](/assets/img/2022-11-30/8.png){: width="100%" }
<br>
<br>
<br>

9. 네트워크 설정은 추후에 보안그룹을 설정 해줄 것이기 때문에 체크박스를 모두 해제 해줍니다. 기존 설정 해 놓은 보안 그룹이 있다면 ``기존 보안그룹 선택``으로 기존 보안그룹을 불러 올 수 있습니다.
![Desktop View](/assets/img/2022-11-30/9.png){: width="100%" }
<br>
<br>
<br>

10. 스토리지를 프리티어 최대 용량인 30GB 으로 설정해줍니다.
![Desktop View](/assets/img/2022-11-30/10.png){: width="100%" }
<br>
<br>
<br>

11. 모든 설정이 끝났다면 마지막으로 ``인스턴스시작`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-11-30/11.png){: width="100%" }
<br>
<br>
<br>

12. 인스턴스 생성이 정상적으로 완료되었다면 목록에서 이전 단계에서 생성한 인스턴스를 볼 수 있습니다.
![Desktop View](/assets/img/2022-11-30/12.png){: width="100%" }
<br>
<br>
<br>

## 탄력적 IP 등록 및 설정
---
AWS EC2 인스턴스는 ON/OFF 또는 시간에 따라 IP가 유동적으로 바뀝니다. ``IP가 바뀐다는 것은 웹서비스를 고정적으로 운영할 수 없다는 뜻``이기 때문에 고정 IP 등록을 해주어야 합니다.
<br>

1. 왼쪽 메뉴탭에서 탄력적 IP를 클릭 후 아래와 같이 ``탄력적IP 주소 할당`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-11-30/13.png){: width="100%" }
<br>
<br>
<br>

2. ``할당`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-11-30/14.png){: width="100%" }
<br>
<br>
<br>

3. 아래와 같이 ``작업`` 박스를 선택후 ``탄력적IP 주소 연결``을 선택합니다.
![Desktop View](/assets/img/2022-11-30/15.png){: width="100%" }
<br>
<br>
<br>

4. 인스턴스 항목의 input box 를 클릭하여 기존에 생성했던 인스턴스를 선택 후 연결 버튼을 클릭합니다. 이후 시간이 조금 지나면 인스턴스 탭에서 탄력적 IP 주소가 할당되었음을 확인 할 수 있습니다.
![Desktop View](/assets/img/2022-11-30/16.png){: width="100%" }
<br>
<br>
<br>

## 보안그룹 설정
---
1. 왼쪽 메뉴탭에서 보안그룹을 선택하고 인스턴스에서 생성시 설정 했던 보안그룹을 체크 후 아래와같이 ``인바운드 규칙 편집`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-11-30/17.png){: width="100%" }
<br>
<br>
<br>

2. 아래와 같이 인바운드 규칙을 설정해주세요. SSH 접속은 내 IP 만 허용 하도록 설정하였습니다. 
![Desktop View](/assets/img/2022-11-30/18.png){: width="100%" }
<br>
<br>
<br>

<div style="font-weight:bold; font-size:1.2rem;">스프링부트(Spring Boot) AWS EC2 war 배포하기 시리즈</div>
---
[스프링부트(Spring Boot) AWS EC2 war 배포하기 (1) - 인스턴스 생성 및 설정](https://08genie.github.io/posts/aws-ec2-springboot-deploy-1/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (2) - PuTTY를 이용한 Ubuntu java , tomcat 설치](https://08genie.github.io/posts/aws-ec2-springboot-deploy-2/)

[스프링부트(Spring Boot) AWS EC2 war 배포하기 (3) - FileZilla를 이용한 Spring Boot war 파일 배포](https://08genie.github.io/posts/aws-ec2-springboot-deploy-3/)
