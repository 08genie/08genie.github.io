---
title: "[MySQL] 프로시저(Procedure) 사용법"
author: genie
date: 2022-08-29 22:55:10 +0900
categories: [Database, MySQL]
tags: [mysql, db, How to, study, procedure]
---

## 프로시저(Procedure)란?
---
프로시저는 한번의 요청으로 여러 SQL문을 사용할 수 있습니다. 그렇기 때문에 프로시저에 묶인 SQL문들은 하나의 쿼리로 해석되어 처리됩니다. ``쉽게 말해 MySQL에서 함수를 정의하는 것이라고 볼 수 있습니다.``
트리거와는 달리 함수처럼 매개변수를 받을 수 있고 결과값 또한 반환 받을 수 있습니다.
<br>
<br>
<br>

## 기본 구조
---
```
    /*기존에 프로시저가 있으면 삭제*/
    DROP procedure IF EXISTS {프로시저 이름};

    DELIMITER $$ 
        CREATE PROCEDURE {프로시저 이름} (
            {IN | OUT | INOUT} {파라미터명 데이터타입}
        )
        BEGIN
            DECLARE {변수명} INT(10) DEFAULT NULL;

            쿼리문

        END $$    
    DELIMITER ;
```

<br>
<br>
<br>

## 프로시저(Procedure) 속성
---
- 파라미터
    - IN    : 프로시저에 값을 전달하기 위해 사용, 프로시저 내부에서 사용 가능
    - OUT   : 호출자에게 값을 return 합니다. 프로시저 내부에서 선언된 값이 return 됩니다.
    - INOUT : 호출자에 의해 하나의 변수가 초기화 되고 프로시저에 의해 수정됩니다. IN+OUT의 결합
<br>
<br>
<br>

## 프로시저(Procedure) 예제
---
``ex) 고객이 어떤 물건을 구입했습니다. 구매테이블(buy)에 구매정보가 INSERT되면 재고테이블(stock)에 해당 물건 수량을 UPDATE 시킵니다.``
```
/*기존에 프로시저가 있으면 삭제*/
DROP PROCEDURE IF EXISTS stockMgmt; 

DELIMITER $$
 
CREATE PROCEDURE stockMgmt
(IN product_name VARCHAR(20)
,IN buyer_name VARCHAR(20)
,OUT result INT)

BEGIN
    
    /*변수 선언*/
    DECLARE quantity INT DEFAULT 0; 
    
    /* SQL에러 발생시 ROLLBACK */
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
        ROLLBACK;
        SET RESULT = -1;
	END;

    /* 트랜잭션 시작 */
    START TRANSACTION;
    
    /*물건을 구입했으므로 stock테이블에 물건 수량을 -1 하여 select*/
    SET quantity = (SELECT IFNULL(sum(quantity-1),0) AS quantity FROM stock WHERE quantity NOT IN(0));

    /*stock 테이블에 -1한 수량을 update*/
    UPDATE stock SET quantity = quantity WHERE product_name = product_name;
    
    /*buy테이블에 구매정보 insert*/
    INSERT INTO buy(product_name, buyer_name) VALUES(product_name, buyer_name);

    COMMIT;

    /*성공하면 1을 반환*/
    SET result = 1; 
    
END $$
 
DELIMITER ;
```
<br>
<br>
<br>

## 프로시저(Procedure) 호출
---
```
CALL stockMgmt('램프','genie', @result);
SELECT @result AS result; 
```
<br>
<br>
<br>

## 프로시저(Procedure) 결과
---
![Desktop View](/assets/img/2022-08-29/1.png){: width="100%" } 

