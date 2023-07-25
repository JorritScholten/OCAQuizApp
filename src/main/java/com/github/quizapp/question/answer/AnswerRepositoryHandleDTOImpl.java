package com.github.quizapp.question.answer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class AnswerRepositoryHandleDTOImpl implements AnswerRepositoryHandleDTO {
    @Autowired
    @Lazy
    private AnswerRepository answerRepository;

    @Override
    public Answer save(AnswerDTO dto) {
        return answerRepository.save(AnswerDTO.Mapper.toAnswer(dto));
    }

    @Override
    public List<Answer> saveAll(Set<AnswerDTO> dtos) {
        return dtos.stream().map(this::save).collect(Collectors.toList());
    }
}
