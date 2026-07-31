package com.example.musiccatalog.service;

import com.example.musiccatalog.dto.AuthResponse;
import com.example.musiccatalog.dto.LoginRequest;
import com.example.musiccatalog.dto.RegisterRequest;
import com.example.musiccatalog.exception.DuplicateResourceException;
import com.example.musiccatalog.exception.ResourceNotFoundException;
import com.example.musiccatalog.model.User;
import com.example.musiccatalog.repository.UserRepository;
import com.example.musiccatalog.security.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Service for handling authentication and user management.
 */
@Service
@Transactional
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Register a new user.
     */
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
                .username(request.getEmail())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .enabled(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        user = userRepository.save(user);
        log.info("User registered successfully: {}", user.getEmail());

        String token = jwtService.generateToken(user);
        return buildAuthResponse(token, user);
    }

    /**
     * Authenticate user and generate token.
     */
    public AuthResponse login(LoginRequest request) {
        log.info("User login attempt: {}", request.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(user);

        log.info("User logged in successfully: {}", user.getEmail());
        return buildAuthResponse(token, user);
    }

    /**
     * Get current user by email.
     */
    public User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .userId(user.getId())
                .build();
    }
}
