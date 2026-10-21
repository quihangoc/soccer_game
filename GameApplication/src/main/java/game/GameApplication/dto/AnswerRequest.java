package game.GameApplication.dto;

import jakarta.validation.constraints.NotBlank;

public record AnswerRequest(@NotBlank String answer) {
}
