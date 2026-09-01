package game.GameApplication.config;


import game.GameApplication.model.Question;
import game.GameApplication.model.QuestionType;
import game.GameApplication.repository.QuestionRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
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

            if (questionRepo.count() == 0L) {

                List<Question> questions = new ArrayList<>();

                questions.add(createQuestion(
                        "Wer ist der erfolgreichste deutsche Fußballspieler?",
                        "Toni Kroos",
                        List.of(
                                "Er hat bereits aufgehört Fußball zu spielen",
                                "Er hat unter anderem bei Real Madrid und Bayern gespielt",
                                "Er ist Weltmeister"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der Superstar in der argentinischen Nationalmannschaft?",
                        "Lionel Messi",
                        List.of(
                                "Er hat lange Jahre bei Barcelona gespielt",
                                "Aktuell spielt er in Amerika",
                                "Sein Spitzname ist Leo"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der französische Superstar, der für seine Geschwindigkeit bekannt ist?",
                        "Kylian Mbappe",
                        List.of(
                                "Er wurde Weltmeister mit Frankreich",
                                "Er spielt(e) für Paris Saint-Germain und Real Madrid",
                                "Er ist extrem schnell"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist das junge Talent vom FC Barcelona?",
                        "Lamine Yamal",
                        List.of(
                                "Er spielt beim FC Barcelona",
                                "Er debütierte sehr jung",
                                "Er gilt als Mega-Talent"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der ägyptische Superstar von Liverpool?",
                        "Mohamed Salah",
                        List.of(
                                "Er spielt beim FC Liverpool",
                                "Er ist einer der besten Scorer der Premier League",
                                "Er ist Kapitän von Ägypten"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der niederländische Abwehrchef von Liverpool?",
                        "Virgil van Dijk",
                        List.of(
                                "Er ist Innenverteidiger",
                                "Er gewann die Champions League mit Liverpool",
                                "Er ist einer der besten Verteidiger der Welt"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der englische Rechtsverteidiger von Liverpool?",
                        "Trent Alexander-Arnold",
                        List.of(
                                "Er kommt aus der Liverpool-Jugend",
                                "Er ist bekannt für seine Flanken",
                                "Er spielt Rechtsverteidiger"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der belgische Spielmacher von Manchester City?",
                        "Kevin De Bruyne",
                        List.of(
                                "Er ist einer der besten Passgeber der Welt",
                                "Er spielt bei Manchester City",
                                "Er ist belgischer Nationalspieler"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der italienische Spielmacher mit legendärer Übersicht?",
                        "Andrea Pirlo",
                        List.of(
                                "Er spielte bei Juventus und AC Milan",
                                "Er gewann die WM 2006",
                                "Er war bekannt für seine Ruhe am Ball"
                        )
                ));

                questions.add(createQuestion(
                        "Wer ist der brasilianische Ballon-d'Or Gewinner von 2007?",
                        "Kaka",
                        List.of(
                                "Er spielte bei AC Milan",
                                "Er gewann den Ballon d'Or 2007",
                                "Er war sehr elegant am Ball"
                        )
                ));

                for (Question q : questions) {
                    questionRepo.save(q);
                }

                System.out.println("Demo-Questions wurden erstellt!");
            }
        };
    }

    private Question createQuestion(String title, String answer, List<String> notes) {
        Question question = new Question();
        question.setQuestionType(QuestionType.NOTE_QUIZ);
        question.setTitle(title);
        question.setAnswerText(answer);
        question.setNotes(notes);
        return question;
    }
}
