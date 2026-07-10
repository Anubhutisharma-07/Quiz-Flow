package com.anubhuti.online_quiz_application.repository;

import com.anubhuti.online_quiz_application.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

}