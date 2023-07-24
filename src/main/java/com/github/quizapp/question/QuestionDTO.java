package com.github.quizapp.question;


import com.github.quizapp.question.answer.AnswerDTO;
import com.github.quizapp.tag.TagDTO;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public record QuestionDTO(QuestionType type, String title, Set<AnswerDTO> answers, String referenceToBook,
                          Set<TagDTO> tags) {
    public static class Mapper {
        public static QuestionDTO toDto(Question question) {
            return new QuestionDTO(
                    question.getType(),
                    question.getTitle(),
                    AnswerDTO.Mapper.toDto(question.getAnswers()),
                    question.getReferenceToBook(),
                    TagDTO.Mapper.toDto(question.getTags())
            );
        }

        public static List<QuestionDTO> toDto(List<Question> questions){
            return questions.stream().map(Mapper::toDto).collect(Collectors.toList());
        }
    }
}
