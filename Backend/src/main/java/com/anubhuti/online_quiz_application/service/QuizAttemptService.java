package com.anubhuti.online_quiz_application.service;

import com.anubhuti.online_quiz_application.entity.QuizAttempt;
import com.anubhuti.online_quiz_application.exception.ResourceNotFoundException;
import com.anubhuti.online_quiz_application.repository.QuizAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizAttemptService {

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    public QuizAttempt saveAttempt(QuizAttempt attempt) {
        return quizAttemptRepository.save(attempt);
    }

    public QuizAttempt getAttempt(Integer id) {
        return quizAttemptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz Attempt not found with id: " + id));
    }
}