---
title: "[MySQL] MySQL 트리거(Trigger) 사용법"
author: genie
date: 2022-08-26 15:03:10 +0900
categories: [Database, MySQL]
tags: [mysql, db, 트리거, trigger]
---

## 트리거(Trigger)란?
---
트리거는 데이터 조작 언어(DML)의 데이터 상태의 관리를 자동화하는 데 사용됩니다. 즉 ``어떤 테이블에서 특정 이벤트(insert, update, delete)가 발생했을 때, 실행시킬 쿼리 작업을 자동으로 수행하도록 설정하는것을 트리거(Trigger)라고 합니다. ``
<br>
<br>
<br>

## 기본 구조
---
```
    DROP trigger IF EXISTS {트리거 이름}; --> 트리거 이름이 존재하면 삭제

    DELIMITER $$ 
        CREATE TRIGGER {트리거 이름}
        {BEFORE | AFTER} {INSERT | UPDATE| DELETE }
        ON {테이블 이름} FOR EACH ROW
        BEGIN
            트리거 내용
        END
    DELIMITER ;
```

<br>
<br>
<br>

## 트리거(Trigger) 종류
---
- 행 트리거   : 테이블 안의 영향을 받는 행 각각에 대해 실행됩니다. (데이터 변화가 생길때마다 실행)
- 문장 트리거 : insert, update, delete 문에 대해 한번만 실행됩니다. (트리거에 의한 단 한번 실행)
<br>
<br>
<br>

## 트리거(Trigger) 속성
---
- 트리거 작동 시점
    - BEFORE : 이벤트 발생 전 트리거 실행
    - AFTER  : 이벤트 발생 후 트리거 실행
<br>
- 이벤트
    - DELETE : ``삭제`` 이벤트일 경우 트리거 실행
    - INSERT : ``삽입`` 이벤트일 경우 트리거 실행
    - UPDATE : ``갱신`` 이벤트일 경우 트리거 실행
<br>
- 키워드
    - OLD    : 예전 데이터(데이터 변경 전) ``OLD.컬럼명``
    - NEW    : 새 데이터(데이터 변경 후) ``NEW.컬러명``

    |       데이터 작업      |          OLD          |           NEW         |
    |-----------------------|:---------------------:|:---------------------:|
    |        INSERT         |         NULL          |        삽입 후 값      |
    |        UPDATE         |      갱신 전 값        |        갱신 후 값      |
    |        DELETE         |      삭제 전 값        |          NULL         |

<br>
<br>

## 트리거(Trigger) 예제
---
``ex) 어떤 상품을 할인하고있습니다. 할인 테이블(discount)에 할인율 컬럼이 업데이트 되면 상품테이블(product)에도 똑같이 할인율 컬럼을 업데이트 시켜줍니다.``
```
DELIMITER $$
 
CREATE TRIGGER sale
AFTER UPDATE             ---> {BEFORE | AFTER} {INSERT | UPDATE| DELETE } 어느 시점에 어떤 작업을 할 것인지 정합니다.
ON product               ---> 트리거를 적용 할  테이블
FOR EACH ROW             ---> 아래 쿼리에 해당하는 모든 row에 적용합니다.
 
BEGIN
     IF NEW.discount_rate != OLD.discount_rate THEN
        UPDATE product 
        SET discount_rate = NEW.discount_rate
        WHERE discount_rate = OLD.discount_rate;
     END IF;   
END $$
 
DELIMITER ;
```
