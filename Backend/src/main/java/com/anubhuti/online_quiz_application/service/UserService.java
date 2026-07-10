package com.anubhuti.online_quiz_application.service;

import com.anubhuti.online_quiz_application.dto.LoginResponse;
import com.anubhuti.online_quiz_application.entity.User;
import com.anubhuti.online_quiz_application.exception.BadRequestException;
import com.anubhuti.online_quiz_application.exception.DuplicateResourceException;
import com.anubhuti.online_quiz_application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User registerUser(User user) {

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new DuplicateResourceException("Email is already registered.");
        }

        user.setRole("STUDENT");

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public LoginResponse loginUser(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new BadRequestException("Invalid email or password.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadRequestException("Invalid email or password.");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                user.getUserId(),
                token,
                user.getEmail(),
                user.getRole()
        );}
}