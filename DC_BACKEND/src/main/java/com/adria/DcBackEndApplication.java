package com.adria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableDiscoveryClient
@SpringBootApplication
public class DcBackEndApplication {
	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() { return new BCryptPasswordEncoder(); }

	public static void main(String[] args) { SpringApplication.run(DcBackEndApplication.class, args); }

}