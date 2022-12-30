---
title: "[Spring Boot] 스케줄러(Scheduler) 사용법 (예제포함)"
author: genie
date: 2022-12-22 23:31:10 +0900
categories: [웹개발, Spring Boot]
tags: [scheduler, cron, scheduled]
---

## 스케줄러란?
---
특정한 시간에 등록한 작업을 자동으로 실행시키는 프로세스입니다.
<br>
<br>
<br>

## @Scheduled 옵션
---

|     fixedDelay     |이전 작업이 종료된 후 설정 시간 이후마다 작업이 실행됩니다.(밀리세컨드)<br>@Scheduled(fixedDelay=1000)|
|     fixedRate      |이전 작업이 수행되기 시작한 시점부터 설정된 시간 이후마다 작업이 실행됩니다.(밀리세컨드)<br>@Scheduled(fixedRate=1000)|
|     initialDelay   |작업 최초 시작시 설정된 시간만큼 기다린 후 시작합니다.(밀리세컨드)<br>Scheduled(fixedRate=1000, initialDelay=2000)|
|     cron           |원하는 시간대를 설정하여 작업을 실행합니다.<br>@Scheduled(cron="* * * * * *")(초 분 시 일 월 요일 년(생략가능))<br>ex) cron="0 0 17 * * *"<br>매일 오후 5시에 작업을 실행한다는 의미입니다.|
|     zone           |미설정 시 로컬 시간대가 적용됩니다.<br>@Scheduled(cron="* * * * * *", zone="Asia/Seoul")|

<br>
<br>
<br>

## Cron 표현식
---
- \* : 모든 조건(매시, 매일, 매주처럼 사용)을 의미합니다.
- ? : 설정 값이 없을때 사용합니다. (날짜, 요일만 사용 가능)
- \- : 범위를 지정할 때 사용합니다.
- , : 여러 값을 지정할 때 사용합니다.
- / : 초기값과 증가치를 설정할 때 사용합니다.
- L : 지정할 수 있는 범위의 마지막 값 설정 시 사용합니다.(날짜와 요일에서만 사용 가능)
- W : 가장 가까운 평일(weekday)을 설정할 때 사용합니다.
<br>
<br>
<br>

## 스케줄러 사용법
---
1. 프로젝트의 Application Class에  ``@EnableScheduling`` 어노테이션을 추가해 스케줄링의 기능을 활성화 합니다.
    ```java
    import org.springframework.scheduling.annot
    ation.EnableScheduling;

    @EnableScheduling
    @SpringBootApplication(scanBasePackages = "kr.co.test")
    @ComponentScan(basePackages = { "kr.co.test" })
    public class SchedulerApplication extends SpringBootServletInitializer {
        
        @Override
        protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
            return application.sources(SchedulerApplication.class);
        }
        
        public static void main(String[] args) {
            SpringApplication.run(SchedulerApplication.class, args);
        }

    }
    ```
    {: file='TestApplication.java'}
<br>
<br>
<br>

2. Scheduler Class를 생성하여 스케줄을 등록합니다.
```java
@Slf4j
@RequiredArgsConstructor //자동 생성자 주입
@Component
public class Scheduler {
	private final CommonMapper commonMapper;
	
	@Scheduled(cron = "0 02 12 * * *", zone = "Asia/Seoul") //매일 12시 02분
	public void statusUpdateTask() throws InterruptedException, SQLException {
		commonMapper.updateStatus();
		log.info("do statusUpdateTask" + new Date());
	}
}
```
<br>
<br>
<br>

3. 결과
![Desktop View](/assets/img/2022-12-22/1.png){: width="100%" }
