package game.GameApplication.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import game.GameApplication.model.DrinkingCard;
import game.GameApplication.model.QuizQuestion;
import game.GameApplication.repository.DrinkingCardRepository;
import game.GameApplication.repository.QuizQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

// Befüllt die Datenbank beim Start aus src/main/resources/data/*.json
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final QuizQuestionRepository quizQuestionRepository;
    private final DrinkingCardRepository drinkingCardRepository;
    private final ObjectMapper objectMapper;

    private record QuizQuestionSeed(String title, String answer, List<String> hints) {
    }

    @Override
    public void run(String... args) throws IOException {
        if (quizQuestionRepository.count() == 0) {
            List<QuizQuestionSeed> seeds = read("data/quiz-questions.json", new TypeReference<>() {});
            quizQuestionRepository.saveAll(seeds.stream()
                    .map(seed -> new QuizQuestion(seed.title(), seed.answer(), seed.hints()))
                    .toList());
        }

        if (drinkingCardRepository.count() == 0) {
            List<String> cards = read("data/drinking-cards.json", new TypeReference<>() {});
            drinkingCardRepository.saveAll(cards.stream().map(DrinkingCard::new).toList());
        }
    }

    private <T> T read(String path, TypeReference<T> type) throws IOException {
        try (InputStream input = new ClassPathResource(path).getInputStream()) {
            return objectMapper.readValue(input, type);
        }
    }
}
