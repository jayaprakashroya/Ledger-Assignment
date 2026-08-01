package com.example.musiccatalog.config;

import com.example.musiccatalog.model.User;
import com.example.musiccatalog.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DemoDataInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DemoDataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        createDemoUser();
    }

    private void createDemoUser() {
        String demoEmail = "demo@example.com";
        if (userRepository.existsByEmail(demoEmail)) {
            log.info("Demo user already exists: {}", demoEmail);
            return;
        }

        User demoUser = User.builder()
                .username("demo_user")
                .email(demoEmail)
                .password(passwordEncoder.encode("password123"))
                .enabled(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(demoUser);
        log.info("Created demo user: {}", demoEmail);
    }
}
