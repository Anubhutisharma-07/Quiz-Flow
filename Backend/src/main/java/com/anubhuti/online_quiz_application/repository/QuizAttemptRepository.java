package com.anubhuti.online_quiz_application.repository;

import com.anubhuti.online_quiz_application.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Integer> {

}