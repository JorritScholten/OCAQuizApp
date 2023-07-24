package com.github.quizapp;

import com.github.quizapp.question.Question;
import com.github.quizapp.question.QuestionDTO;
import com.github.quizapp.question.QuestionRepository;
import com.github.quizapp.question.QuestionType;
import com.github.quizapp.question.answer.Answer;
import com.github.quizapp.question.answer.AnswerDTO;
import com.github.quizapp.question.answer.AnswerRepository;
import com.github.quizapp.tag.Tag;
import com.github.quizapp.tag.TagDTO;
import com.github.quizapp.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
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
            // old method
            List<Tag> tags = List.of(
                    new Tag("dummy tag"),
                    new Tag("other")
            );
            tagRepository.saveAll(tags);

            // new method
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
            // old method
            List<Answer> answers = List.of(
                    Answer.builder()
                            .answer("Yes")
                            .isCorrect(true)
                            .build(),
                    Answer.builder()
                            .answer("No")
                            .isCorrect(false)
                            .explanation("obviously not correct")
                            .build());
            List<Question> questions = List.of(
                    Question.builder()
                            .type(QuestionType.YESNO)
                            .title("Is this a yes/no question?")
                            .referenceToBook("0.1.0")
                            .answers(answers)
                            .tags(tagRepository.findByName("other"))
                            .build()
            );
            questionRepository.saveAll(questions);
            answerRepository.saveAll(answers);

            // new method
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
