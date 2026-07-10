package com.anubhuti.online_quiz_application.dto;

public class AnswerRequest {

    private Integer questionId;
    private String selectedAnswer;

    public AnswerRequest() {
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getSelectedAnswer() {
        return selectedAnswer;
    }

    public void setSelectedAnswer(String selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
    }
}