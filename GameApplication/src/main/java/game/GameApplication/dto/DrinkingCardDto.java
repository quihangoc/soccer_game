package game.GameApplication.dto;

import game.GameApplication.model.DrinkingCard;

public record DrinkingCardDto(Long id, String text) {

    public static DrinkingCardDto from(DrinkingCard card) {
        return new DrinkingCardDto(card.getId(), card.getText());
    }
}
