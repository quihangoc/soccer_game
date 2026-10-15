package game.GameApplication.repository;

import game.GameApplication.model.Question;
import game.GameApplication.model.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {
    Optional<Question> findByQuestionType(QuestionType questionType);
    List<Question> findAllByQuestionType(QuestionType questionType);
}
