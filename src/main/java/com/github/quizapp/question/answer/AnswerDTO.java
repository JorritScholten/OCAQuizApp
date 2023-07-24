package com.github.quizapp.question.answer;

import java.util.Set;
import java.util.stream.Collectors;

public record AnswerDTO(String answer, boolean isCorrect, String explanation) {
    public static class Mapper {
        public static AnswerDTO toDto(Answer answer) {
            return new AnswerDTO(answer.getAnswer(), answer.isCorrect(), answer.getExplanation());
        }

        public static Set<AnswerDTO> toDto(Set<Answer> answers) {
            return answers.stream().map(Mapper::toDto).collect(Collectors.toSet());
        }

        public static Answer toAnswer(AnswerDTO dto) {
            return Answer.builder()
                    .answer(dto.answer)
                    .isCorrect(dto.isCorrect)
                    .explanation(dto.explanation)
                    .build();
        }

        public static Set<Answer> toAnswer(Set<AnswerDTO> dtos) {
            return dtos.stream().map(Mapper::toAnswer).collect(Collectors.toSet());
        }
    }
}
