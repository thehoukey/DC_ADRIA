FROM openjdk
MAINTAINER Hakim Arhazzal <hakim.arhazzal@gmail.com>
ADD target/proxy-service.jar proxy-service.jar
ENTRYPOINT ["java", "-jar", "/proxy-service.jar"]
EXPOSE 8761