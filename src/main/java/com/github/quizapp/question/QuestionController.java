package com.github.quizapp.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("api/v1/question")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping
    public QuestionDTO postQuestion(@RequestBody QuestionDTO question) {
        return QuestionDTO.Mapper.toDto(questionRepository.save(question));
    }

    @GetMapping("{id}")
    public Optional<QuestionDTO> getById(@PathVariable("id") long id) {
        return questionRepository.findById(id).map(QuestionDTO.Mapper::toDto);
    }

    @GetMapping
    public List<QuestionDTO> getItems() {
        return questionRepository.findAll().stream().map(QuestionDTO.Mapper::toDto).collect(Collectors.toList());
    }
}
