package com.anubhuti.online_quiz_application.repository;

import com.anubhuti.online_quiz_application.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findByUserId(Integer userId);
}