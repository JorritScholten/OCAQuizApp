package com.github.quizapp;

import com.github.quizapp.question.QuestionDTO;
import com.github.quizapp.question.QuestionRepository;
import com.github.quizapp.question.QuestionType;
import com.github.quizapp.question.answer.AnswerDTO;
import com.github.quizapp.question.answer.AnswerRepository;
import com.github.quizapp.tag.TagDTO;
import com.github.quizapp.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class Seeder implements CommandLineRunner {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public void run(String... args) {
        seedTags();
        seedQuestions();
    }

    private void seedTags() {
        if (tagRepository.count() == 0) {
            var tagDTOs = Set.of(
                    new TagDTO("chapter 1"),
                    new TagDTO("chapter 2"),
                    new TagDTO("chapter 3"),
                    new TagDTO("chapter 4"),
                    new TagDTO("chapter 5"),
                    new TagDTO("chapter 6"),
                    new TagDTO("chapter 7")
            );
            tagRepository.saveAll(tagDTOs);
        }
    }

    private void seedQuestions() {
        if (questionRepository.count() == 0) {
            var questionDTO = QuestionDTO.builder()
                    .type(QuestionType.YESNO)
                    .title("Was this question created using a JPA Entity?")
                    .answer(new AnswerDTO("Yes", false, null))
                    // using a builder explanation can be omitted to make it null
                    .answer(AnswerDTO.builder()
                            .answer("No")
                            .isCorrect(true)
                            .build())
                    .referenceToBook("1.2.3")
                    // tags (or answers) can be added individually or as a collection
                    .tag(new TagDTO("dummy tag"))
                    .tags(Set.of(
                            new TagDTO("tag created in DTO"),
                            new TagDTO("seeded"))
                    )
                    .build();
            questionRepository.save(questionDTO);
        }
    }
}
