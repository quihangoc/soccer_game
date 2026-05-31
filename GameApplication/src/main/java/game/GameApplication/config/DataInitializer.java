package game.GameApplication.config;


import game.GameApplication.model.Question;
import game.GameApplication.model.QuestionType;
import game.GameApplication.repository.QuestionRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;


@Configuration
public class DataInitializer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    CommandLineRunner initData(QuestionRepo questionRepo) {
        return args -> {

            if (questionRepo.count() == 0) {
                Question question = new Question();
                question.setQuestionType(QuestionType.NOTE_QUIZ);
                question.setTitle("Frage Titel");
                question.setAnswerText("Antwort");
                question.setNotes(List.of("Hinweis 1", "Hinweis 2", "Hinweis 3"));

                questionRepo.save(question);

                System.out.println("Demo-Daten für Player & Groups wurden erstellt!");
            }
        };
    }
}
