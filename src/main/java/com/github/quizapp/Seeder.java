package com.github.quizapp;

import com.github.quizapp.question.Answer;
import com.github.quizapp.question.Question;
import com.github.quizapp.question.QuestionRepository;
import com.github.quizapp.question.QuestionType;
import com.github.quizapp.tag.Tag;
import com.github.quizapp.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Seeder implements CommandLineRunner {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private TagRepository tagRepository;

    @Override
    public void run(String... args) {
        seedTags();
        seedQuestions();
    }

    private void seedTags() {
        if (tagRepository.count() == 0) {
            List<Tag> tags = List.of(
                    new Tag("dummy tag"),
                    new Tag("other")
            );
            tagRepository.saveAll(tags);
        }
    }

    private void seedQuestions() {
        if (questionRepository.count() == 0) {
            List<Question> questions = List.of(
                    Question.builder()
                            .type(QuestionType.YESNO)
                            .title("Is this a yes/no question?")
                            .answer(Answer.builder()
                                    .answer("Yes")
                                    .isCorrect(true)
                                    .build())
                            .answer(Answer.builder()
                                    .answer("No")
                                    .isCorrect(false)
                                    .explanation("obviously not correct")
                                    .build())
                            .referenceToBook("0.0.0")
                            .tags(tagRepository.findByName("other"))
                            .build()
            );
            questionRepository.saveAll(questions);

        }
    }
}
