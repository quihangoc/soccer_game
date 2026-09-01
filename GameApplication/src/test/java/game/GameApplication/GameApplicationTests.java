package game.GameApplication;

import game.GameApplication.model.Question;
import game.GameApplication.repository.QuestionRepo;
import game.GameApplication.service.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class GameApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void validateAnswerIgnoresDiacritics() {
		QuestionService service = new QuestionService();
		QuestionRepo questionRepo = mock(QuestionRepo.class);
		Question question = new Question();
		question.setAnswerText("Straße");
		when(questionRepo.findById(1L)).thenReturn(Optional.of(question));
		ReflectionTestUtils.setField(service, "questionRepo", questionRepo);

		assertTrue(service.validateAnswer(1L, "Strasse"));
		assertTrue(service.validateAnswer(1L, "\"strasse\""));
	}

}
