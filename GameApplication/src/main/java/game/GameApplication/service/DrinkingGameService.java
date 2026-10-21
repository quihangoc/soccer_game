package game.GameApplication.service;

import game.GameApplication.dto.DrinkingCardDto;
import game.GameApplication.repository.DrinkingCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DrinkingGameService {

    private final DrinkingCardRepository drinkingCardRepository;

    public List<DrinkingCardDto> getCards() {
        return drinkingCardRepository.findAll().stream()
                .map(DrinkingCardDto::from)
                .toList();
    }
}
