package com.anubhuti.online_quiz_application.controller;

import com.anubhuti.online_quiz_application.dto.QuizResultDetailsResponse;
import com.anubhuti.online_quiz_application.dto.QuizResultResponse;
import com.anubhuti.online_quiz_application.dto.QuizSubmissionRequest;
import com.anubhuti.online_quiz_application.service.QuizEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quiz-engine")
public class QuizEngineController {

    @Autowired
    private QuizEngineService quizEngineService;
    @GetMapping("/result/{attemptId}")

    public QuizResultDetailsResponse getResultByAttemptId(@PathVariable Integer attemptId) {

        return quizEngineService.getResultByAttemptId(attemptId);
    }

    @PostMapping("/submit")
    public QuizResultResponse submitQuiz(@RequestBody QuizSubmissionRequest request) {
        return quizEngineService.submitQuiz(request);
    }
}