package game.GameApplication.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuizQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String answer;

    // Reihenfolge der Tipps bleibt über die Order-Spalte erhalten
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "quiz_question_hint", joinColumns = @JoinColumn(name = "question_id"))
    @OrderColumn(name = "position")
    @Column(name = "text", nullable = false)
    private List<String> hints = new ArrayList<>();

    public QuizQuestion(String title, String answer, List<String> hints) {
        this.title = title;
        this.answer = answer;
        this.hints = new ArrayList<>(hints);
    }
}
