package game.GameApplication.service;

import game.GameApplication.model.Question;
import game.GameApplication.repository.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            return null; // oder Exception werfen
        }

        Random random = new Random();
        int randomIndex = random.nextInt(questionList.size());

        return questionList.get(randomIndex);
    }

    public boolean validateAnswer(Long id, String answer){
        Question question = questionRepo.findById(id).get();
        String normalizedAnswer = answer == null ? "" : answer.trim();
        if (normalizedAnswer.startsWith("\"") && normalizedAnswer.endsWith("\"") && normalizedAnswer.length() > 1) {
            normalizedAnswer = normalizedAnswer.substring(1, normalizedAnswer.length() - 1).trim();
        }

        if(question.getAnswerText().trim().equalsIgnoreCase(normalizedAnswer)){
            return true;
        }
        return false;
    }
}
