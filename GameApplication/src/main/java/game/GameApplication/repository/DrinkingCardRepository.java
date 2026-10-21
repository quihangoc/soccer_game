package game.GameApplication.repository;

import game.GameApplication.model.DrinkingCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkingCardRepository extends JpaRepository<DrinkingCard, Long> {
}
