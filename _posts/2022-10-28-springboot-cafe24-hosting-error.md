---
title: "[Cafe24] 스프링부트(Spring Boot) 카페24(cafe24) 호스팅 404,500 에러(error)"
author: genie
date: 2022-10-28 21:19:10 +0900
categories: [호스팅, Cafe24]
tags: [스프링부트, springboot, 호스팅, 완벽정리, cafe24 호스팅, 에러, How to, Study]
---

로그 확인은 ``tomcat > logs > catalina.날짜`` 파일을 열어 확인 가능합니다.
![Desktop View](/assets/img/2022-10-28/1.png){: width="100%" }
<br>
<br>
<br>

## 404 에러 처리 과정
---

1. 톰캣 로그를 확인해 보니 아래와 같이 ``java.lang.ClassNotFoundException`` 에러가 났습니다.
	```console
	26-Oct-2022 17:42:08.365 심각 [http-nio-8509-exec-2] org.apache.catalina.core.ApplicationDispatcher.invoke Servlet.service() for servlet jsp threw exception
	java.lang.ClassNotFoundException: org.apache.jsp.WEB_002dINF.views.index_jsp
		at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
		at org.apache.jasper.servlet.JasperLoader.loadClass(JasperLoader.java:131)
		at org.apache.jasper.servlet.JasperLoader.loadClass(JasperLoader.java:62)
		at org.apache.catalina.core.DefaultInstanceManager.newInstance(DefaultInstanceManager.java:159)
		at org.apache.jasper.servlet.JspServletWrapper.getServlet(JspServletWrapper.java:171)
		at org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:375)
		at org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:396)
		at org.apache.jasper.servlet.JspServlet.service(JspServlet.java:340)
		at javax.servlet.http.HttpServlet.service(HttpServlet.java:729)

		...생략
		
	``` 
![Desktop View](/assets/img/2022-10-28/2.png){: width="100%" }
<br>
<br>
<br>

2. 구글링을 해보니 라이브러리 버전이 문제 일 수 있다는 말에 pom.xml 에서 노란 경고 표시가 된 라이브러리 버전을 삭해 주었습니다. 
 - jsp 파일이 class 파일로 컴파일 되어 빌드되는 과정에서 문제가 발생 할 수 있다 하여 톰캣을 재시작해보았다. (실패)
 - 실서버 ``tomcat > work`` 폴더의 하위 파일들을 삭제 후 톰캣을 재시작해보았다(실패)
 - 라이브러리 충돌 일 수 있어 maven 레포지터리를 삭제 후 다시 재빌드 해보았으나 되지 않았습니다.(실패)
 - pom.xml 노란 경고 표시 버전 태그 삭제(성공)
![Desktop View](/assets/img/2022-10-28/3.png){: width="100%" }
<br>
<br>
<br>

3. 이번엔 다른 에러를 만났습니다. ``spring-boot-autoconfigure-2.7.5.jar`` 파일이 존재하지 않는다는 에러입니다. 
	```
	26-Oct-2022 17:42:47.551 심각 [ContainerBackgroundProcessor[StandardEngine[프로젝트이름]]] org.apache.catalina.core.StandardContext.listenerStop Exception sending context destroyed event to listener instance of class org.springframework.boot.web.servlet.support.SpringBootServletInitializer$SpringBootContextLoaderListener
	java.lang.IllegalStateException: java.io.FileNotFoundException: /프로젝트이름/tomcat/webapps/ROOT/WEB-INF/lib/spring-boot-autoconfigure-2.7.5.jar (그런 파일이나 디렉터리가 없습니다)
		at org.apache.catalina.webresources.AbstractSingleArchiveResourceSet.getArchiveEntry(AbstractSingleArchiveResourceSet.java:100)
		at org.apache.catalina.webresources.AbstractArchiveResourceSet.getResource(AbstractArchiveResourceSet.java:265)
		at org.apache.catalina.webresources.StandardRoot.getResourceInternal(StandardRoot.java:281)
		at org.apache.catalina.webresources.Cache.getResource(Cache.java:62)
		at org.apache.catalina.webresources.StandardRoot.getResource(StandardRoot.java:216)
		at org.apache.catalina.webresources.StandardRoot.getClassLoaderResource(StandardRoot.java:225)
		at org.apache.catalina.loader.WebappClassLoaderBase.findResourceInternal(WebappClassLoaderBase.java:2541)
		at org.apache.catalina.loader.WebappClassLoaderBase.findClassInternal(WebappClassLoaderBase.java:2377)
		at org.apache.catalina.loader.WebappClassLoaderBase.findClass(WebappClassLoaderBase.java:855)
		at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1304)
		at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1163)
		at org.springframework.web.context.ContextLoaderListener.contextDestroyed(ContextLoaderListener.java:113)
		at org.springframework.boot.web.servlet.support.SpringBootServletInitializer$SpringBootContextLoaderListener.contextDestroyed(SpringBootServletInitializer.java:247)

		...생략

	``` 
<br>
<br>
<br>

4. spring-boot-autoconfigure 파일이 존재 하지 않는다고 하니 ``pom.xml``에 해당 dependency를 추가 해주었습니다.
	```xml
		<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-autoconfigure</artifactId>
		</dependency>
	```
	{: file='pom.xml'}
<br>
<br>
<br>	

## 505 에러 처리 과정
---
1. autoconfigure을 추가 해주니 이번엔 500 에러로 바뀌었습니다. 오류로그를 보니 하나이상의 아파치 에러가 뜹니다. 
	```
	26-Oct-2022 20:09:12.365 심각 [http-nio-8509-exec-1] org.apache.catalina.core.ApplicationDispatcher.invoke Servlet.service() for servlet jsp threw exception
	java.lang.ClassNotFoundException: # Licensed to the Apache Software Foundation (ASF) under one or more
		at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1335)
		at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1163)
		at javax.el.ExpressionFactory.newInstance(ExpressionFactory.java:147)
		at javax.el.ExpressionFactory.newInstance(ExpressionFactory.java:93)
		at org.apache.jasper.compiler.PageInfo.<init>(PageInfo.java:79)
		at org.apache.jasper.compiler.Compiler.generateJava(Compiler.java:114)
		at org.apache.jasper.compiler.Compiler.compile(Compiler.java:358)
		at org.apache.jasper.compiler.Compiler.compile(Compiler.java:338)
		at org.apache.jasper.compiler.Compiler.compile(Compiler.java:325)
		at org.apache.jasper.JspCompilationContext.compile(JspCompilationContext.java:580)
		at org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:363)
		at org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:396)
		at org.apache.jasper.servlet.JspServlet.service(JspServlet.java:340)
		at javax.servlet.http.HttpServlet.service(HttpServlet.java:729)

		...생략
		
	```
![Desktop View](/assets/img/2022-10-28/4.png){: width="100%" }	
<br>
<br>
<br>

2. ``pom.xml`` 에 아래와 같은 dependency 가 있다면 scope provided 를 설정 해야 합니다.
	```xml
	<dependency>
		<groupId>org.apache.tomcat.embed</groupId>
		<artifactId>tomcat-embed-jasper</artifactId>
		<scope>provided</scope>
	</dependency>
	```
	{: file='pom.xml'}
	>  proviede : 컴파일 시점에는 필요하지만 배포시점에는 불필요한 라이브러리로 servlet API, Java EE API 등은 scope 를 provided 로  지정해야 합니다. 왜냐하면 런타임 시 JDK 혹은 컨테이너가 제공해주기 때문입니다. 
	{: .prompt-info }
	>  저는 provided 를 설정 했음 에도 불구 하고 프로젝트를 war 파일로 묶었을 때 ``WEB-INF > lib`` 폴더에 tomcat-embed 관련 jar 파일이 그대로 묶여 있어 배포시에는 수동으로 삭제 해주었습니다.
	{: .prompt-tip }
<br>
<br>
<br>

3. 이제 ``pom.xml``에 mysql 관련 dependency 가 있다면 삭제 해주세요.
	```xml
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
	</dependency>
	```
	{: file='pom.xml'}
<br>
<br>
<br>

4. 마지막으로 mysql 을 dependency 에서 삭제 했기 때문에 수동으로 넣어주어야 합니다. 아래와 같이 ``WEB-INF > lib`` 폴더 안에 수동으로 mysql connector jar 파일을 넣어주고 파일질라를 통해 war 파일을 배포하면 에러가 해결된 것을 볼 수 있습니다.
![Desktop View](/assets/img/2022-10-28/5.png){: width="100%" }
<br>
<br>
<br>

## 스프링부트(Spring Boot) 카페24(cafe24) 호스팅
---
[[Cafe24] 스프링부트(Spring Boot) 카페24(cafe24) 호스팅](https://08genie.github.io/posts/springboot-cafe24-hosting/)

