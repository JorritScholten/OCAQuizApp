package com.github.quizapp.question.answer;

import java.util.List;
import java.util.Set;

public interface AnswerRepositoryHandleDTO {
    Answer save(AnswerDTO dto);

    List<Answer> saveAll(Set<AnswerDTO> dtos);
}
