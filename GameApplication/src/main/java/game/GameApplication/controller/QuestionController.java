package game.GameApplication.controller;

import game.GameApplication.model.Question;
import game.GameApplication.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestion(@PathVariable Long id){
        Question question = questionService.getQuestion(id);
        if(question == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(question);
    }
}
