package com.github.quizapp.question.answer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

import java.util.Set;
import java.util.stream.Collectors;

@Builder
@Getter
@AllArgsConstructor
public class AnswerDTO {
    @NonNull
    private final String answer;
    @NonNull
    private final Boolean isCorrect;
    private final String explanation;

    public static class Mapper {
        public static AnswerDTO toDto(Answer answer) {
            return new AnswerDTO(answer.getAnswer(), answer.getIsCorrect(), answer.getExplanation());
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
