package com.github.quizapp.question;

import com.github.quizapp.question.answer.Answer;
import com.github.quizapp.tag.Tag;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue
    private long id;

    private QuestionType type;

    @Column(columnDefinition = "text", nullable = false)
    private String title;

    @Singular
    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn
    private Set<Answer> answers;

    @Column(columnDefinition = "text", nullable = false)
    private String referenceToBook;

    @Singular
    @ManyToMany
    private Set<Tag> tags;
}
