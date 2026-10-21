package game.GameApplication.service;

import game.GameApplication.dto.AnswerResult;
import game.GameApplication.dto.QuizQuestionDto;
import game.GameApplication.exception.NotFoundException;
import game.GameApplication.model.QuizQuestion;
import game.GameApplication.repository.QuizQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizService {

    private final QuizQuestionRepository quizQuestionRepository;

    public QuizQuestionDto getQuestion(Long id) {
        return QuizQuestionDto.from(findQuestion(id));
    }

    public QuizQuestionDto getRandomQuestion() {
        List<Long> ids = quizQuestionRepository.findAllIds();
        if (ids.isEmpty()) {
            throw new NotFoundException("Keine Quizfragen vorhanden");
        }

        Long randomId = ids.get(ThreadLocalRandom.current().nextInt(ids.size()));
        return getQuestion(randomId);
    }

    public AnswerResult checkAnswer(Long id, String answer) {
        QuizQuestion question = findQuestion(id);
        boolean correct = AnswerNormalizer.matches(question.getAnswer(), answer);
        return new AnswerResult(correct, question.getAnswer());
    }

    private QuizQuestion findQuestion(Long id) {
        return quizQuestionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Quizfrage " + id + " nicht gefunden"));
    }
}
