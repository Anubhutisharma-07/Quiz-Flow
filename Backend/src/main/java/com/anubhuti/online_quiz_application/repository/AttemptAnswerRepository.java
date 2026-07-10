package com.anubhuti.online_quiz_application.repository;

import com.anubhuti.online_quiz_application.entity.AttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttemptAnswerRepository extends JpaRepository<AttemptAnswer, Integer> {
}
