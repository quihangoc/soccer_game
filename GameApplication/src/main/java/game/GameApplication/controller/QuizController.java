package game.GameApplication.controller;

import game.GameApplication.dto.AnswerRequest;
import game.GameApplication.dto.AnswerResult;
import game.GameApplication.dto.QuizQuestionDto;
import game.GameApplication.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz/questions")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/random")
    public QuizQuestionDto getRandomQuestion() {
        return quizService.getRandomQuestion();
    }

    @GetMapping("/{id}")
    public QuizQuestionDto getQuestion(@PathVariable Long id) {
        return quizService.getQuestion(id);
    }

    @PostMapping("/{id}/answer")
    public AnswerResult checkAnswer(@PathVariable Long id, @Valid @RequestBody AnswerRequest request) {
        return quizService.checkAnswer(id, request.answer());
    }
}
