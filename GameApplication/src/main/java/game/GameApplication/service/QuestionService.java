package game.GameApplication.service;

import game.GameApplication.model.Question;
import game.GameApplication.repository.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Random;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepo questionRepo;

    public Question getQuestion(Long id){
        Question question = questionRepo.findById(id).get();
        return question;
    }

    public Question getRandomQuestion(){
        List<Question> questionList = questionRepo.findAll();

        if (questionList.isEmpty()) {
            return null; 
        }

        Random random = new Random();
        int randomIndex = random.nextInt(questionList.size());

        return questionList.get(randomIndex);
    }

    public boolean validateAnswer(Long id, String answer){
        Question question = questionRepo.findById(id).get();
        String normalizedAnswer = normalizeText(answer);
        String normalizedExpectedAnswer = normalizeText(question.getAnswerText());

        return normalizedExpectedAnswer.equals(normalizedAnswer);
    }

    private String normalizeText(String value) {
        if (value == null) {
            return "";
        }

        String normalized = value.trim();
        if (normalized.startsWith("\"") && normalized.endsWith("\"") && normalized.length() > 1) {
            normalized = normalized.substring(1, normalized.length() - 1).trim();
        }

        normalized = normalized
                .replace("ß", "ss")
                .replace("æ", "ae")
                .replace("œ", "oe")
                .replace("ø", "o")
                .replace("Æ", "AE")
                .replace("Œ", "OE")
                .replace("Ø", "O");

        normalized = Normalizer.normalize(normalized, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replaceAll("[^a-zA-Z0-9 ]", "")
                .toLowerCase();

        return normalized.trim();
    }
}
