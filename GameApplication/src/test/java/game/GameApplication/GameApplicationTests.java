package game.GameApplication;

import game.GameApplication.service.AnswerNormalizer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GameApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void answerNormalizerIgnoresDiacritics() {
		assertTrue(AnswerNormalizer.matches("Straße", "Strasse"));
		assertTrue(AnswerNormalizer.matches("Kylian Mbappé", "  kylian   mbappe "));
		assertFalse(AnswerNormalizer.matches("Toni Kroos", "Kroos"));
	}

	@Test
	void randomQuestionDoesNotRevealAnswer() throws Exception {
		mockMvc.perform(get("/api/quiz/questions/random"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.title").isString())
				.andExpect(jsonPath("$.hints", hasSize(3)))
				.andExpect(jsonPath("$.answer").doesNotExist());
	}

	@Test
	void checkAnswerReturnsResultWithCorrectAnswer() throws Exception {
		mockMvc.perform(post("/api/quiz/questions/1/answer")
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"answer\": \"toni kroos\"}"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.correct").value(true))
				.andExpect(jsonPath("$.correctAnswer").value("Toni Kroos"));
	}

	@Test
	void checkAnswerRejectsBlankAnswer() throws Exception {
		mockMvc.perform(post("/api/quiz/questions/1/answer")
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"answer\": \" \"}"))
				.andExpect(status().isBadRequest());
	}

	@Test
	void unknownQuestionReturnsNotFound() throws Exception {
		mockMvc.perform(get("/api/quiz/questions/9999"))
				.andExpect(status().isNotFound());
	}

	@Test
	void drinkingGameReturnsAllCards() throws Exception {
		mockMvc.perform(get("/api/drinking-game/cards"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(40)))
				.andExpect(jsonPath("$[0].text").value("Trinke 1 Schluck"));
	}

}
