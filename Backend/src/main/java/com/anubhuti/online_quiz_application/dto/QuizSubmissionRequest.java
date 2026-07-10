package com.anubhuti.online_quiz_application.dto;

import java.util.List;

public class QuizSubmissionRequest {

    private Integer userId;
    private Integer quizId;
    private List<AnswerRequest> answers;

    public QuizSubmissionRequest() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getQuizId() {
        return quizId;
    }

    public void setQuizId(Integer quizId) {
        this.quizId = quizId;
    }

    public List<AnswerRequest> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerRequest> answers) {
        this.answers = answers;
    }
}