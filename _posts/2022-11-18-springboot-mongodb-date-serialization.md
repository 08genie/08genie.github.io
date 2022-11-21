---
title: "[Spring Boot] 스프링부트(Spring Boot) MongoDB URI 다중 DB 연결 (DB 2개)"
author: genie
date: 2022-11-18 20:15:10 +0900
categories: [웹개발, Spring Boot]
tags: [mongdb, 다중db, springboot]
---

## pom.xml
---
pom.xml 파일에 mongoDB dependency를 추가해줍니다.
```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
```
{: file='pom.xml'}
<br>
<br>
<br>

## application.yml
---
1. 여러 MongoTemplate 개체를 생성하기 위해서는 mongoDB에 대한 Spring Boot 자동 구성을 비활성화 해야합니다. application.yml 에 ``autoconfigure`` 속성을 추가해주세요.
2. ``mongodb`` 속성도 아래와 같이 추가합니다.
```yml
spring:
  mvc:
    view:
      prefix: /WEB-INF/views/
      suffix: .jsp
  autoconfigure:
    exclude: org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration    
  data:
    mongodb:
      primary:
        uri: mongodb+srv://주소/디비이름1
      secondary:
        uri: mongodb+srv://주소/디비이름2
```
{: file='application.yml'}
<br>
<br>
<br>

## MongoDBConfig.java
---
config 패키지를 생성하여 ``MongoDBConfig.java`` 파일을 만들어줍니다.
```java
package kr.co.test.config;

이곳부터 작성 ------------------------------------------------------------------------

import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoDBConfig {

    @Primary
    @Bean(name = "primaryProperties")
    @ConfigurationProperties(prefix = "spring.data.mongodb.primary")
    public MongoProperties getPrimaryProps() throws Exception {
        return new MongoProperties();
    }

    @Bean(name = "secondaryProperties")
    @ConfigurationProperties(prefix = "spring.data.mongodb.secondary")
    public MongoProperties getSecondaryProps() throws Exception {
        return new MongoProperties();
    }

    @Primary
    @Bean(name = "primaryMongoTemplate")
    public MongoTemplate primaryMongoTemplate() throws Exception {
        return new MongoTemplate(primaryMongoDatabaseFactory(getPrimaryProps()));
    }

    @Bean(name ="secondaryMongoTemplate")
    public MongoTemplate secondaryMongoTemplate() throws Exception {
        return new MongoTemplate(secondaryMongoDatabaseFactory(getSecondaryProps()));
    }

    @Primary
    @Bean
    public MongoDatabaseFactory primaryMongoDatabaseFactory(MongoProperties mongo) throws Exception {
        return new SimpleMongoClientDatabaseFactory(
                mongo.getUri()
        );
    }

    @Bean
    public MongoDatabaseFactory secondaryMongoDatabaseFactory(MongoProperties mongo) throws Exception {
        return new SimpleMongoClientDatabaseFactory(
                mongo.getUri()
        );
    }
}
```
{: file='MongoDBConfig.java'}
<br>
<br>
<br>

## PrimaryConfig.java
---
이전단계에서 만든 config 패키지에 ``PrimaryConfig.java`` 파일을 만들어줍니다.
```java
package kr.co.test.config;

이곳부터 작성 ------------------------------------------------------------------------

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = {"kr.co.test.repository.primary"},//적용 repository 패키지경로 
mongoTemplateRef = PrimaryConfig.MONGO_TEMPLATE
)
public class PrimaryConfig {
    protected static final String MONGO_TEMPLATE = "primaryMongoTemplate";
}
```
{: file='PrimaryConfig.java'}
<br>
<br>
<br>

## SecondaryConfig.java
---
이전단계에서 만든 config 패키지에 ``SecondaryConfig.java`` 파일을 만들어줍니다.
```java
package kr.co.test.config;

이곳부터 작성 ------------------------------------------------------------------------

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@Configuration
@EnableMongoRepositories(basePackages = "kr.co.test.repository.secondary", //적용 repository 패키지경로 
mongoTemplateRef = SecondaryConfig.MONGO_TEMPLATE
)
public class SecondaryConfig {
    protected static final String MONGO_TEMPLATE = "secondaryMongoTemplate";
}
```
{: file='SecondaryConfig.java'}
<br>
<br>
<br>

## PrimaryModel.java
---
```java
package kr.co.test.model;

이곳부터 작성 ------------------------------------------------------------------------

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "primary_mongo")
public class PrimaryModel {
	
	@Id
	private String id;
	
	private String value;

}
```
{: file='PrimaryModel.java'}
<br>
<br>
<br>

## SecondaryModel.java
---
```java
package kr.co.test.model;

이곳부터 작성 ------------------------------------------------------------------------

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "secondary_mongo")
public class SecondaryModel {
	
	@Id
	private String id;
	
	private String value;

}
```
{: file='SecondaryModel.java'}
<br>
<br>
<br>

## PrimaryRepository.java
---
repository 경로에 primary 패키지를 생성하고 ``PrimaryRepository.java`` 파일을 만들어줍니다. 
```java
package kr.co.test.repository.primary;

이곳부터 작성 ------------------------------------------------------------------------

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import kr.co.surepick.admin.model.AdminMemberModel;

@Repository
public interface PrimaryRepository extends MongoRepository<PrimaryModel, String>{

	PrimaryModel findByValue(String value); //예시
}

```
{: file='PrimaryRepository.java'}
<br>
<br>
<br>

## SecondaryRepository.java
---
repository 경로에 secondary 패키지를 생성하고 ``SecondaryRepository.java`` 파일을 만들어줍니다. 
```java
package kr.co.test.repository.secondary;

이곳부터 작성 ------------------------------------------------------------------------

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import kr.co.surepick.admin.model.AdminMemberModel;

@Repository
public interface SecondaryRepository extends MongoRepository<SecondaryModel, String>{

	SecondaryModel findByValue(String value); //예시
}

```
{: file='SecondaryRepository.java'}
<br>
<br>
<br>









