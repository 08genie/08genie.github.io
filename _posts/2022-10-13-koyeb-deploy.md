---
title: "[Koyeb] 코예브(Koyeb)로 깃허브(Github) node.js 프로젝트 배포하기"
author: genie
date: 2022-10-13 21:32:10 +0900
categories: [호스팅, Koyeb]
tags: [koyeb, 호스팅, 코예브, hosting, How to, Study]
---

## 코예브(Koyeb)란?
---
Koyeb란 안정적이고 확장 가능한 애플리케이션을 전 세계적으로 쉽게 배포할 수 있도록 설계된 개발자 친화적인 플랫폼입니다. Koyeb 에서는 Docker 컨테이너, 기본 코드 및 기능을 원활하게 지원하여 전 세계적으로 애플리케이션을 배포, 실행 및 확장할 수 있는 통합 환경을 제공합니다.
>  Docker : VM(가상 시스템)은 CPU나 기타 자원들을 완전히 가상화 하여 컴퓨터를 새로 만든다고 볼 수 있다면 Docker는 리눅스 컨테이너 기술을 이용하여 가상화 하지 않고 프로세스만 격리하여 빠르게 실행시키는 기술입니다. ``즉 운영체제 위에 운영체제를 설치하는 것이 아닌 기존의 운영체제 안에서 프로세스만 격리하는 것으로, 프로세스만 격리할뿐 기존 시스템 자원을 공유하기 때문에 용량을 줄 일 수 있어 속도가 빠르다는 장점이 있습니다. ``
{: .prompt-info }
>  리눅스 컨테이너 : 운영체제 수준의 가상화 기술로 리눅스 커널을 공유하면서 프로세스를 격리된 환경에서 실행하는 기술입니다. 하드웨어를 가상화하는 VM과는 달리 커널을 공유하는 방식이기 때문에 실행속도가 빠르고 성능상의 손실이 거의 없습니다.
{: .prompt-info }
<br>
<br>
<br>

## 코예브(Koyeb) 배포하기
---
**Notice**: [**코예브**](https://www.koyeb.com/)에 가입해주세요. 저는 깃허브로 연동하여 가입하였습니다.

<br>

1. 코예브에 로그인후  ``create App`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-10-13/1.png){: width="100%" }
<br>
<br>
<br>

2. App name을 작성하고 ``next`` 버튼을 클릭합니다.
![Desktop View](/assets/img/2022-10-13/2.png){: width="100%" }
<br>
<br>
<br>

3. ① Github 버튼을 클릭하면 Github koyeb 설치 페이지 창이 뜹니다. 허용할 Repository를 선택 후 install 해주세요.
② 설치가 완료되면 다시 Koyeb 페이지로 돌아와 Repository에서 올리고자 하는 프로젝트를 선택합니다.
③ 실행하고자하는 js 파일을 작성합니다. (node 실행파일.js)
④ Service name을 입력합니다.
⑤ ``Create service`` 버튼을 클릭합니다. 
![Desktop View](/assets/img/2022-10-13/3.png){: width="100%" }
<br>
<br>
<br>

4. 서비스 생성이 완료 되면 아래와 같이 생성한 서비스페이지로 이동됩니다. Build logs 에 ``Build succeeded ✅`` 라는 문구가 뜨면 배포가 정상적으로 완료 된 것입니다. 그 후
아래와 같이 Public URL을 클릭하시면 호스팅 된 사이트를 확인해 볼 수 있습니다.
![Desktop View](/assets/img/2022-10-13/4.png){: width="100%" }
<br>
<br>
<br>

5. 혹시 ``Build succeeded ✅`` 라는 문구가 떴는데 호스팅이 안될 경우에는 Runtime Logs 탭 메뉴로 들어가 오류가 없는지 확인해주세요! 아래는 정상적으로 작동되었을때의 logs 입니다.
![Desktop View](/assets/img/2022-10-13/5.png){: width="100%" }


