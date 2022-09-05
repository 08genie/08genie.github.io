---
title: "[Spring Boot] 어노테이션(Annotation)"
author: genie
date: 2022-09-04 15:49:10 +0900
categories: [Framework, Spring]
tags: [spring, java, springBoot, annotation, How to, Study]
---

## 어노테이션(Annotation)이란?
---
사전적 의미로는 주석이라는 뜻을 가집니다. 
@를 이용하여 자바코드의 클래스, 메서드, 변수 등 모든 요소에 사용 할 수 있으며 코드 사이에 주석처럼 쓰여 특별한 의미나 기능을 수행하도록 하는 것 입니다.
``즉, 프로그램에게 추가적인 정보를 제공해주는 일종의 메타데이터 라고 볼 수 있습니다.``
자바나 스프링에서 제공해 주는 어노테이션도 있지만 사용자가 직접 정의하는 것 또한 가능 합니다.
<br>
<br>
<br>

## 어노테이션의 등장 배경
---
메타데이터는 설정 정보 저장의 역할을 하고 이를 xml 형태로 작성하여 사용되어 왔습니다. 그러나 IT의 발전으로 인해 프로그램의 규모가 커지게 되면서 IOC Container의 설정이 복잡해지게 되었고 이를 해결하기 위해 어노테이션이 등장했습니다.
>  IOC(Inversion of Control, 제어의 역전) : IoC란 객체를 생성하고 관계를 설정하는 역할을 모두 프레임워크가 대신하여 프로그램의 흐름제어가 개발자에서 프레임워크로 넘어가는 것을 이야기 합니다. 그렇기 때문에 제어의 역전이라고도 부릅니다. ``IoC Container를 설정한다는 것은 특정 객체 생성과 관계설정, 사용, 제거 등의 작업을 프레임워크가 관리해주도록 Bean으로 등록해주는 것입니다.`` IoC Container에 의해 관리 되는 객체들은 Bean 이라고 부릅니다. 
{: .prompt-info }
<br>
<br>

## 어노테이션의 장점
---
- 미리 정해진 형식에 따라 간결하게 작성할 수 있고 따로 설정 파일이 아닌  클래스를 생성하고 코드에 주석과 같이 추가하여 사용할 수 있어 코드가 간략해집니다.
- 데이터에 대한 유효성 검사 조건을 어노테이션을 사용하여 Model 클래스에 직접 명시함으로써 데이터 유효성 검사에 용이합니다.
- 생산성이 증가합니다.
<br>
<br>
<br>

## 어노테이션의 단점
---
 - 코드 변경 시, 클래스를 매번 컴파일해야합니다. 따라서 전체 시스템에 영향을 주는 객체들만 설정파일(xml)로 관리하고 나머지 객체들은 어노테이션으로 관리하면 좋습니다.
 <br>
 <br>
 <br>

## 어노테이션의 종류
---
@Configuration
 : DI(의존기능) 설정정보를 담은 클래스라는 것을 명시해줍니다.

@Bean
 : @Configuration이 붙은 DI 설정용 클래스에서 주로 사용됩니다.

@Value
 : 속성 필드 위에 작성하면 기본값을 지정 할 수 있습니다.

@Component
: XML Configuration 파일에 Bean을 등록하지 않고 객체를 사용할 수 있습니다. 하지만 아래와 같이 @componentScan을 설정해주어야합니다.

```java
@SpringBootApplication
@ComponentScan(basePackages = { "kr.co.sample" })
public class SampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SampleApplication.class, args);
	}

}
```
> Ctrl 버튼을 누른 후 @SpringBootApplication을 클릭하여 따라 들어가 보면 이미 @ComponentScan이 정의 되어 있는 것 을 볼 수 있습니다. Main Class에서  @ComponentScan을 설정하지 않으면 @SpringBootApplication이 정의된 곳이 base package로 설정됩니다. 그렇기 때문에 Main Class의 위치가 중요합니다.
{: .prompt-tip }

@ComponentScan("package명")
 : base-package에 명시된 패키지의 클래스에 @Compoinent가 존재한다면 그 클래스를 객체화 시킵니다.

@Autowired
 : 어노테이션을 특정 필드에 부여하면 IoC컨테이너 안에 존재하는 특정 필드와 같은 타입의 Bean을 찾아 자동으로 주입해줍니다.

 ```java
 public class SampleController {

    @Autowired
    private SampleService sampleService;

}
 ```

@Controller, @Service, @Repository, @Mapper
 : @Component와 같은 기능을 하지만 세부적인 이름을 지정함으로써 역할을 정확하게 명시해줍니다.
 : @Controller : 사용자 입출력
 : @Service : 업무단위
 : @Repository(DTO) : 데이터를 제공받는 부분

>  @Repository와 @Mapper의 차이
    <br>
    @Mapper:  SQL을 메소드로 쓰기 위해 SQL 결과를 정의해놓은 모델이고 맵핑하기 위한 이름 그대로의 맵퍼입니다.
    <br>
    @Repository:  @Mapper처럼 맵핑하기 위해도 쓰여지지만 DB를 조회 및 조작하는 것에 중점을 둔 개념입니다.
    <br>
    그렇기 때문에 @Repository는 @Mapper의 상위 개념입니다.
    @Repository는 자동으로 Bean 등록이 되며 @Mapper는 아래와 같이 @MapperScan을 같이 사용해주어야 합니다.
{: .prompt-info }

```java
@SpringBootApplication       
@MapperScan("kr.co.sample.mapper")  
public class SampleApplication {
    public static   void main(String[] args) {
        SpringApplication.run(application.class,args);
    }
}
```

@RequestMapping
 : 특정 uri로 요청을 보내면 Controller에서 어떠한 방식으로 처리 할지를 정의합니다. 이때 들어온 요청을 특정 메서드와 매핑하기 위해 사용하는 것이 @RequestMapping 입니다.

 ```java
 @Controller
public class SampleController {

    //GET, POST, PATCH, DELETE
    @RequestMapping(value = "/sample", method = RequestMethod.GET)
    public String sampleGet(...) {
        ...
    }

    @PostMapping("/sample")
    public String samplePost(...) {
        ...
    }

}
 ```
 > @GetMapping , @PostMapping, @PatchMapping, @DeleteMapping 으로 더 많이 사용됩니다.
{: .prompt-tip }

@RequestBody
 : Http body 안의 JSON을 DTO에 맵핑하는 역할을 합니다. 그렇기 때문에 Http 요청을 자바 객체로 전달 받을 수 있습니다. 주로 비동기 통신에 사용됩니다. 

@ResponseBody
 : DTO객체를 JSON으로 바꿔서 Http body에 담는 역할을 합니다. 그렇기 때문에 return값을 Http Response body에 담을 수 있습니다. 주로 비동기 통신에 사용됩니다.

@RestController
 : 해당 컨트롤러 아래의 모든 메소드가 ResponseBody로 return 됩니다. 

@PathVariable
 : uri에 들어오는 변수를 받는 역할을 합니다.
```java
@PostMapping("/sample/{index}")
public void samplePost(@PathVariable Integer index){...}
```


