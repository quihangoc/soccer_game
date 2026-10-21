package game.GameApplication.dto;

import game.GameApplication.model.QuizQuestion;

import java.util.List;

// Enthält bewusst keine Antwort, damit sie nicht schon vor dem Raten im Browser landet
public record QuizQuestionDto(Long id, String title, List<String> hints) {

    public static QuizQuestionDto from(QuizQuestion question) {
        return new QuizQuestionDto(question.getId(), question.getTitle(), List.copyOf(question.getHints()));
    }
}
