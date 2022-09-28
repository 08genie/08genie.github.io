---
title: "[Spring Boot] 스프링부트 프로시저(Procedure) 사용법"
author: genie
date: 2022-09-28 10:48:10 +0900
categories: [Framework, Spring Boot]
tags: [mysql, db, springboot, 스프링부트, 프로시저, How to, study, procedure]
---

## 프로시저(Procedure) 예제
---
``ex) 고객이 어떤 물건을 구입했습니다. 구매테이블(buy)에 구매정보가 INSERT되면 재고테이블(stock)에 해당 물건 수량을 UPDATE 시킵니다.``
```
/*기존에 프로시저가 있으면 삭제*/
DROP PROCEDURE IF EXISTS stockMgmt; 

DELIMITER $$
 
CREATE PROCEDURE stockMgmt
(IN productNum INT
,IN buyerName VARCHAR(20)
,OUT result INT)

BEGIN
    
    /*변수 선언*/
    DECLARE quantityNum INT DEFAULT 0; 

    /* SQL에러 발생시 ROLLBACK */
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET result = -1;
    END;

    /* 트랜잭션 시작 */
    START TRANSACTION;

    /*물건을 구입했으므로 stock테이블에 물건 수량을 -1 하여 select*/
    SET quantityNum = (SELECT sum(quantity-1) AS quantity FROM stock WHERE product_num = productNum);

    IF quantityNum >=0 THEN

        /*stock 테이블에 -1한 수량을 update*/
        UPDATE stock SET quantity = quantityNum WHERE product_num = productNum;
        
        /*buy테이블에 구매정보 insert*/
        INSERT INTO buy(product_num, buyer_name) VALUES(productNum, buyerName);
        
        /*성공하면 1을 반환*/
        SET result = 1;

    ELSE

        /*재고가 0이면 -1을 반환*/
        SET result = -1;

    END IF;

    COMMIT;
    
END $$
 
DELIMITER ;
```
<br>
<br>
<br>

> 스프링부트 프로시저를 작성할때 주의할 점!
<br>
파라미터 타입과 return 받는 타입을 동일하게 해주세요.
return 값이 파라미터로 던진 변수로 들어옵니다!
{: .prompt-tip }
<br>
<br>

## Controller
---
```java
...생략

/* 상품 구매하기 ajax 통신 */
@ResponseBody
@PostMapping("/buy")
public Map<String,Object> memberResign(@RequestBody BuyDTO buyDTO, HttpSession session) {
    Boolean result = false;

    try {
        
        result = productService.insertBuy(buyDTO);
        
    } catch (Exception e) {
        e.printStackTrace();
    }
    
    return result;
}
```
<br>
<br>
<br>

## Service
---
```java
...생략

public Boolean insertBuy(BuyDTO buyDTO){
    Boolean result   = false;
    
    try {

        //결과 값이 return 되면 파라미터로 던진 buyDTO로 결과값이 들어옵니다.
        mypageMapper.insertBuy(buyDTO); 

        if(buyDTO.getResult() <= 0) {   //result가 -1이면 구입 실패!
                throw new RuntimeException("상품 구입에 실패했습니다.");
        }
        
        result = true;
        
    } catch(SQLException sqle) {
        log.info(sqle.getMessage());
    } catch (RuntimeException re) {
        log.info(re.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
    }
    return result;
}
```
<br>
<br>
<br>

## Mapper
---
```java
    ... 생략

    BuyDTO insertBuy(BuyDTO buyDTO) throws SQLException;
```
<br>
<br>
<br>


## Model
---
```java
    ... 생략
import lombok.Data;

@Data
public class BuyDTO {
	private int productNum;
	private String buyerName;
    private int result;
}

```
<br>
<br>
<br>

# Xml
---
아래와 같이 프로시저를 호출하고 반환될 result는 mode, jdbcType, javaType 을 작성해주어야 합니다. BuyDTO 안에 있는 result와 타입을 맞춰주세요! 
```xml
    ... 생략
    
	<select id="insertBuy" statementType="CALLABLE" >
	    <![CDATA[
        	{CALL stockMgmt(#{productNum}, #{buyerName}, #{result , mode=OUT, jdbcType=INTEGER, javaType=int})}
    	]]>
	</select>
```

