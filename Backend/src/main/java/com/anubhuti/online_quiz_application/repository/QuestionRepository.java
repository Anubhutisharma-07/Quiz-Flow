package com.anubhuti.online_quiz_application.repository;

import com.anubhuti.online_quiz_application.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findByQuizQuizId(Integer quizId);

}