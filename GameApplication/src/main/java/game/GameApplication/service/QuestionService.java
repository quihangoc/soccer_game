package game.GameApplication.service;

import game.GameApplication.model.Question;
import game.GameApplication.repository.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepo questionRepo;

    public Question getQuestion(Long id){
        Question question = questionRepo.findById(id).get();
        return question;
    }
}
