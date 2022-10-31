---
title: "[IT 용어] 도메인(Domain)과 DNS(Domain Name System, 네임서버)"
author: genie
date: 2022-10-07 00:05:10 +0900
categories: [IT 지식]
tags: [도메인, domain, DNS, 네임서버]
---

## 도메인(Domain)이란?
---
도메인이란 사람들이 흔히 알고 있는 인터넷 주소를 말합니다. 예를 들면 도메인 이름 ``google.com``은 ip 주소 ``142.250.196.124``를 가리킵니다. 이처럼 ip 주소는 기억하기 어렵기 때문에 각 IP에 이름을 부여 하고 , 이것을 도메인이라고 합니다.
<br>
<br>
<br>

## URL과 도메인(Domain)의 차이점
---
URL은 흔히 웹주소라고 표현하며 프로토콜과 서브 도메인 등의 정보가 포함되어있습니다. 제 블로그 URL [**https://08genie.github.io**](https://08genie.github.io)를 예로 들면 아래와 같이 분리 할 수 있습니다.
 - Protocol  : https
 - SubDoamin : www
 - Domain    : 08genie.github.io
<br>
<br>
<br>

## DNS(네임서버)란?
---
도메인을 해당 ip 주소로 변환해주는 서버 입니다. ``즉 도메인을 어떤 ip를 가진 서버와 연결하는 담당을 하는 것이 이 DNS(네임서버)가 하는 일입니다.``
<br>
<br>
① 사용자가 도메인을 입력하여 검색합니다. ② DNS 서버로 도메인 주소가 전달되고 서버 내부에서 도메인 주소를 토대로 해당 ip 주소를 반환합니다. ③ 다시 브라우저에게 반환된 ip 주소를 가지고 있는 호스팅 서버(해당 웹사이트 데이터가 저장된 곳)로 가도록 지시합니다. ④ 브라우저가 다시 ip 주소로 접속 하여 웹사이트가 보이게 됩니다.
![Desktop View](/assets/img/2022-10-07/1.png){: width="100%" } 
<br>
<br>
<br>


