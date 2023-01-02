---
title: "[Java] static, final, static final 차이점"
author: genie
date: 2022-12-28 20:02:10 +0900
categories: [Language, Java]
tags: [static, final, static final]
---

## Static
---
Static은 ``고정된`` 이라는 의미로 , 메모리에 한번 할당되면 프로그램이 종료될 때 해제되고, Static 영역에 할당 되기 때문에 모든 객체가 공유하는 메모리라는 장점을 지니지만, Garbage Collector의 관리 영역 밖에 존재하므로 Static을 자주 사용하면 시스템의 퍼포먼스에 악영향을 주게 됩니다. 객체 생성 없이 사용 할 수 있는 필드와 메소드를 생성하고자 할 때 사용 합니다.

> Garbage Collector: 메모리 관리 기법중 하나로, 더 이상 사용되지 않는 인스턴스를 찾아 메모리에서 해제 시키는 기능입니다. (JVM의 Heap 영역에서 작동, 불필요한 메모리를 알아서 정리해줍니다.)
{: .prompt-info } 
<br>
<br>

아래와 같이 클래스를 생성하고

```java
public class Calculator{
    public static int num = 5;

    public static int add(int x, int y) {
        return x + y;
    }

    public int min(int x, int y) {
        return x - y;
    }
}
```
{: file='Calculator.java'}
객체 생성 없이 사용 가능합니다.
```java
Calculator.add(1,2); //static 메소드 이므로 객체 생성없이 사용 가능합니다.
Calculator.min(1,2); //static 메소드가 아니므로 객체 생성 후 사용 가능합니다.
Calculator.num;

Calculator cal = new Calculator();
cal.add(1, 2);   // O 가능하나 권장되지 않습니다.
cal.min(1, 2);   // O 
```
<br>
<br>
<br>

## Final
---
Final은 ``최종적인`` 이라는 의미로, 값이 저장되면 수정이 불가능하다는 것을 의미합니다. final 키워드는 어떤 곳에 사용되냐에 따라 다른 의미를 가집니다. 하지만 final 키워드를 붙이면 무언가 제한한다는 의미를 가지는 것은 공통적입니다.
<br>
<br>

**final variable(변수)**<br>
final 키워드가 붙은 변수는 초기화 후 변경 할 수 없습니다.
```java
final String text = "Hello world";
text = "genie"; //컴파일 에러
```
<br>
<br>

**final arguments(인자)**<br>
final로 선언된 인자는 매소드 내에서 변경이 불가능 합니다. 
```java
public void func(final String text) {

    System.out.println(text); // O
    text = "genie"; //컴파일 에러
}
```
<br>
<br>

**final class(클래스)**<br>
클래스에 final을 붙이면 다른 클래스가 상속 할 수 없습니다.
```java
final class MyClass {

    final String text;

    MyClass() {
        text = "Hello world";
    }
}

class test extends MyClass { //컴파일 에러

}
```
<br>
<br>

**final method(메소드)**<br>
final 메소드는 Override(재정의)가 안되도록 합니다.
```java
class MyClass {

    final String text = "Hello world";

    final String getText() {
        return text;
    }

}

class text extends Myclass {

    @Override
    String getText() { //컴파일 에러
        return "genie";
    }

}
```
<br>ㄴ
<br>
<br>

## static final
---
static + final = ``고정된 + 최종적인`` 이라는 의미로, 객체마다 바뀌는 값이아닌 클래스에 존재하는 상수이므로 선언과 동시에 초기화를 해주는 클래스 상수입니다.
<br>
<br>

```java
static final double PI = 3.141592;
// 해당 값은 객체마다 저장될 필요가 없으며(static 특징) + 여러 값을 가질 수 없습니다.(final 특징);
```


