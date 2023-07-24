package com.github.quizapp.question;

import com.github.quizapp.question.answer.AnswerRepository;
import com.github.quizapp.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

public class QuestionRepositoryHandleDTOImpl implements QuestionRepositoryHandleDTO {
    @Autowired
    @Lazy
    private QuestionRepository questionRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public Question save(QuestionDTO dto) {
        var tags = tagRepository.saveAll(dto.getTags());
        var answers = answerRepository.saveAll(dto.getAnswers());
        var question = Question.builder()
                .type(dto.getType())
                .title(dto.getTitle())
                .answers(answers)
                .referenceToBook(dto.getReferenceToBook())
                .tags(tags)
                .build();
        return questionRepository.save(question);
    }
}
