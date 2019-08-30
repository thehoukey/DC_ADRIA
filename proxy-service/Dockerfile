FROM openjdk
MAINTAINER Hakim Arhazzal <hakim.arhazzal@gmail.com>
ADD target/proxy-service.jar proxy-service.jar
ENV springprofiles="" \
    MAXRAMIFNOLIMIT=256

ENTRYPOINT MAXRAM=$(expr `cat /sys/fs/cgroup/memory/memory.limit_in_bytes` / 512 / 512) && \
           MAXRAM=$(($MAXRAM>$MAXRAMIFNOLIMIT?$MAXRAMIFNOLIMIT:$MAXRAM))m && \
           echo "MaxRam: $MAXRAM" && \
           java -XX:MaxRAM=$MAXRAM -Djava.security.egd=file:/dev/./urandom -jar -Dspring.profiles.active="$springprofiles" config-service.jar


#ENTRYPOINT ["java", "-jar", "/config-service.jar"]
EXPOSE 8089