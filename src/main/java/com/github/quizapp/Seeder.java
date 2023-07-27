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
                    .type(QuestionType.MULTIPLESELECTION)
                    .title("Which of the following options contain correct code to declare and initialize variables " +
                            "to store whole numbers?")
                    .answer(new AnswerDTO("bit a = 0;", false, "There are no primitive data types in Java with the names bit and integer. " +
                            "The correct names are byte and int."))
                    .answer(new AnswerDTO("integer a2 = 7;", false, "There are no primitive data types in Java with the names bit and integer. " +
                            "The correct names are byte and int."))
                    .answer(new AnswerDTO("double a5 = 10;", false, "It defines a variable of type double, " +
                            "which is used to store decimal numbers, not integers."))
                    // using a builder explanation can be omitted to make it null
                    .answer(AnswerDTO.builder()
                            .answer("long a3 = 0x10C;")
                            .isCorrect(true)
                            .explanation("It assigns a hexadecimal literal value to the variable a3.")
                            .build())
                    .answer(AnswerDTO.builder()
                            .answer("short a4 = 0512;")
                            .isCorrect(true)
                            .explanation("It assigns an octal literal value to the variable a4.")
                            .build())
                    .answer(AnswerDTO.builder()
                            .answer("byte a7 = -0;")
                            .isCorrect(true)
                            .explanation("-0 is a valid literal value.")
                            .build())
                    .answer(AnswerDTO.builder()
                            .answer("long a8 = 123456789;")
                            .isCorrect(true)
                            .explanation("123456789 is a valid integer literal value that can be assigned\n" +
                                    "to a variable of type long.")
                            .build())
                    .referenceToBook("2")
                    // tags (or answers) can be added individually or as a collection
                    .tag(new TagDTO("chapter 2"))
                    .tags(Set.of(
                            new TagDTO("tag created in DTO"),
                            new TagDTO("seeded"))
                    )
                    .build();
            questionRepository.save(questionDTO);


            questionDTO = QuestionDTO.builder()
                    .type(QuestionType.MULTIPLECHOICE)
                    .title("What is the meaning of “write once, run anywhere”?")
                    .answer(new AnswerDTO("Java code can be written by one team member and executed by other team members.", false, null))
                    .answer(new AnswerDTO("It is for marketing purposes only.", false, null))
                    .answer(new AnswerDTO("Old Java code doesn’t need recompilation when newer versions of JVMs are released.", false, null))

                    // using a builder explanation can be omitted to make it null
                    .answer(AnswerDTO.builder()
                            .answer("It enables Java programs to be compiled once and can be executed by any JVM without recompilation.")
                            .isCorrect(true)
                            .explanation("Platform independence, or “write once, run anywhere,” enables Java code to be compiled once and run on any system with a JVM. It isn’t for marketing purposes only.")
                            .build())
                    .referenceToBook("1")
                    // tags (or answers) can be added individually or as a collection
                    .tag(new TagDTO("chapter 1"))
                    .tags(Set.of(
                            new TagDTO("tag created in DTO"),
                            new TagDTO("seeded"))
                    )
                    .build();
            questionRepository.save(questionDTO);

            questionDTO = QuestionDTO.builder()
                    .type(QuestionType.YESNO)
                    .title("Is it true that if the return type of a method is int, the method can return a value of type" +
                            "byte.")
                    .answer(new AnswerDTO("Yes", true, null))
                    .answer(new AnswerDTO("No", false, null))
                    .referenceToBook("1")
                    // tags (or answers) can be added individually or as a collection
                    .tag(new TagDTO("chapter 3"))
                    .tags(Set.of(
                            new TagDTO("return type"),
                            new TagDTO("byte"))
                    )
                    .build();
            questionRepository.save(questionDTO);
        }
    }
}
