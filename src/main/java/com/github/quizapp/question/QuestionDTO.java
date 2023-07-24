package com.github.quizapp.question;


import com.github.quizapp.tag.TagDTO;

import java.util.Set;

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
    }
}
