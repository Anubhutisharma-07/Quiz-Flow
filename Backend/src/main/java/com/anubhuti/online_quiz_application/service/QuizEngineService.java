package com.anubhuti.online_quiz_application.service;

import com.anubhuti.online_quiz_application.dto.AnswerRequest;
import com.anubhuti.online_quiz_application.dto.QuizResultResponse;
import com.anubhuti.online_quiz_application.dto.QuizSubmissionRequest;
import com.anubhuti.online_quiz_application.entity.AttemptAnswer;
import com.anubhuti.online_quiz_application.entity.Question;
import com.anubhuti.online_quiz_application.entity.QuizAttempt;
import com.anubhuti.online_quiz_application.repository.AttemptAnswerRepository;
import com.anubhuti.online_quiz_application.repository.QuestionRepository;
import com.anubhuti.online_quiz_application.repository.QuizAttemptRepository;
import com.anubhuti.online_quiz_application.repository.QuizRepository;
import com.anubhuti.online_quiz_application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.anubhuti.online_quiz_application.dto.QuizResultDetailsResponse;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizEngineService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private AttemptAnswerRepository attemptAnswerRepository;

    public QuizResultResponse submitQuiz(QuizSubmissionRequest request) {

        QuizResultResponse response = new QuizResultResponse();

        // Fetch User
        var user = userRepository.findByUserId(request.getUserId());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Fetch Quiz
        var quiz = quizRepository.findById(request.getQuizId()).orElse(null);

        if (quiz == null) {
            throw new RuntimeException("Quiz not found");
        }

        // Create a new Quiz Attempt
        QuizAttempt attempt = new QuizAttempt();

        attempt.setUser(user);
        attempt.setQuiz(quiz);
        attempt.setScore(0);
        attempt.setAttemptDate(LocalDateTime.now());

        // Save Attempt
        attempt = quizAttemptRepository.save(attempt);

        // Fetch all questions of the quiz
        List<Question> questions = questionRepository.findByQuizQuizId(quiz.getQuizId());

        int score = 0;

        // Compare submitted answers
        for (AnswerRequest answerRequest : request.getAnswers()) {

            for (Question question : questions) {

                if (question.getQuestionId().equals(answerRequest.getQuestionId())) {

                    AttemptAnswer attemptAnswer = new AttemptAnswer();

                    attemptAnswer.setQuizAttempt(attempt);
                    attemptAnswer.setQuestion(question);
                    attemptAnswer.setSelectedAnswer(answerRequest.getSelectedAnswer());

                    boolean correct = question.getCorrectAnswer()
                            .equalsIgnoreCase(answerRequest.getSelectedAnswer());

                    attemptAnswer.setIsCorrect(correct);

                    if (correct) {
                        score++;
                    }

                    attemptAnswerRepository.save(attemptAnswer);

                    break;
                }
            }
        }

        // Update final score
        attempt.setScore(score);
        quizAttemptRepository.save(attempt);

        // Prepare response
        response.setAttemptId(attempt.getAttemptId());
        response.setScore(score);
        response.setTotalQuestions(questions.size());

        double percentage = 0.0;

        if (!questions.isEmpty()) {
            percentage = (score * 100.0) / questions.size();
        }

        response.setPercentage(percentage);

        return response;
    }
    public QuizResultDetailsResponse getResultByAttemptId(Integer attemptId) {

        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        QuizResultDetailsResponse response = new QuizResultDetailsResponse();

        response.setAttemptId(attempt.getAttemptId());
        response.setUsername(attempt.getUser().getUsername());
        response.setQuizTitle(attempt.getQuiz().getTitle());
        response.setScore(attempt.getScore());

        List<Question> questions =
                questionRepository.findByQuizQuizId(attempt.getQuiz().getQuizId());

        response.setTotalQuestions(questions.size());

        double percentage = 0.0;

        if (!questions.isEmpty()) {
            percentage = (attempt.getScore() * 100.0) / questions.size();
        }

        response.setPercentage(percentage);
        response.setAttemptDate(attempt.getAttemptDate());

        return response;
    }
}