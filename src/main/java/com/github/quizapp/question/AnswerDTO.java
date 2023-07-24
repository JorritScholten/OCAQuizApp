package com.github.quizapp.question;

import java.util.Set;
import java.util.stream.Collectors;

public record AnswerDTO(String answer, boolean isCorrect, String explanation) {
    public static class Mapper {
        public static AnswerDTO toDto(Answer answer) {
            return new AnswerDTO(answer.getAnswer(), answer.isCorrect(), answer.getExplanation());
        }

        public static Set<AnswerDTO> toDto(Set<Answer> answers) {
            return answers.stream().map(AnswerDTO.Mapper::toDto).collect(Collectors.toSet());
        }
    }
}
