FROM openjdk
MAINTAINER Hakim Arhazzal <hakim.arhazzal@gmail.com>
ADD target/config-service.jar config-service.jar
ENTRYPOINT ["java", "-jar", "/config-service.jar"]
EXPOSE 3333