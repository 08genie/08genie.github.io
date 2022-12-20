---
title: "[Java] 싱글톤(Singleton) 패턴"
author: genie
date: 2022-12-09 20:24:10 +0900
categories: [Language, Java]
tags: [singleton, pattern]
---

## 싱글톤 패턴이란?
---
 싱글톤 패턴이란 애플리케이션이 시작 될 때 어떤 클래스가 최초에 한번만 메모리를 할당하고 그 메모리에 인스턴스를 만들어 사용하는 디자인 패턴입니다. ``즉 생성자가 여러번 호줄 되더라도 실제 생성되는 객체는 최초 생성되었던 객체를 리턴하게 되는 패턴을 의미합니다. ``
<br>
<br>
<br>

## 싱글톤 패턴 장점
---
- 고정된 메모리 영역을 얻으면서 한번의 new 연산자로 인스턴스를 사용하기 때문에 메모리 낭비를 방지 할 수 있습니다.
- 싱글톤으로 만들어진 클래스의 인스턴스는 전역이기 때문에 다른 클래스의 인스턴스들이 데이터를 공유하는데에 용이합니다.
- 인스턴스가 한개만 존재하는 것을 보증하고 싶을 경우 사용합니다.
- 두번째 이용 부터는 객체 로딩 시간이 줄어 성능이 좋아집니다.
<br>
<br>
<br>

## 싱글톤 패턴 단점
---
- 싱글톤 인스턴스가 너무 많은 일을 하거나 많은 데이터를 공유 시킬 경우 다른 클래스의 인스턴스간의 결합도가 높아져 개방-폐쇄 원칙을 위배하게 됩니다.
- 결합도가 높아지게 되면, 유지보수가 힘들고 테스트도 원활하게 진 행 할 수 없습니다. 
- 멀티 스레드 환경에서 동기화 처리를 하지 않았을 때, 인스턴스가 2개 생성되는 문제가 발생 할 수 있습니다.
<br>
<br>
<br>

## 싱글톤 패턴 예제
---
```java
public class Singleton {

    //최초 인스턴스를 만들어줍니다.
    private static Singleton instance = new Singleton();
    
    // 생성자는 외부에서 호출하지 못하도록 private 으로 지정해야 합니다.
    private Singleton() {

    }

    //외부에서 싱글톤 인스턴스를 가져 올 수 있도록 메소드를 작성합니다.
    public static Singleton getInstance() {
        return instance;
    }

    public void say() {
        System.out.println("hello world");
    }
}
```
<br>
싱글톤 호출하기
```java
Singleton singleton = Singleton.getInstance();

singleton.say();

```

