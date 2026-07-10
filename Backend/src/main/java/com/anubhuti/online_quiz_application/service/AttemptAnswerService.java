package com.anubhuti.online_quiz_application.service;

import com.anubhuti.online_quiz_application.entity.AttemptAnswer;
import com.anubhuti.online_quiz_application.repository.AttemptAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttemptAnswerService {

    @Autowired
    private AttemptAnswerRepository attemptAnswerRepository;

    public AttemptAnswer saveAnswer(AttemptAnswer answer) {
        return attemptAnswerRepository.save(answer);
    }
}