package com.anubhuti.online_quiz_application.dto;

public class LoginResponse {

    private Integer userId;
    private String token;
    private String email;
    private String role;

    public LoginResponse(String token, String email, String role) {
    }

    public LoginResponse(Integer userId, String token, String email, String role) {
        this.userId = userId;
        this.token = token;
        this.email = email;
        this.role = role;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}