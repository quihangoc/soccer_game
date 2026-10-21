package game.GameApplication.controller;

import game.GameApplication.dto.DrinkingCardDto;
import game.GameApplication.service.DrinkingGameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/drinking-game")
@RequiredArgsConstructor
public class DrinkingGameController {

    private final DrinkingGameService drinkingGameService;

    @GetMapping("/cards")
    public List<DrinkingCardDto> getCards() {
        return drinkingGameService.getCards();
    }
}
