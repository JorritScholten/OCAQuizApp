package com.github.quizapp.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/v1/question")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping
    public Question postQuestion(@RequestBody Question question){
        return questionRepository.save(question);
    }

    @GetMapping("{id}")
    public Optional<Question> getById(@PathVariable("id") long id) {
        return questionRepository.findById(id);
    }

    @GetMapping
    public List<Question> getItems() {
        return questionRepository.findAll();
    }
}
