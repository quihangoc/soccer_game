package game.GameApplication.repository;

import game.GameApplication.model.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    // Nur die IDs laden, damit für eine Zufallsfrage nicht alle Fragen samt Tipps geholt werden
    @Query("select q.id from QuizQuestion q")
    List<Long> findAllIds();
}
