package com.github.quizapp.entity;

import io.hypersistence.utils.hibernate.type.array.BooleanArrayType;
import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "questions")
public class Question {
    @Id
    private long id;

    private QuestionType type;

    @Column(columnDefinition = "text")
    private String title;

    @Type(StringArrayType.class)
    @Column(columnDefinition = "text[]")
    private String[] possibleAnswers;

    @Type(BooleanArrayType.class)
    @Column(columnDefinition = "boolean[]")
    private boolean[] correctAnswers;

    @Type(StringArrayType.class)
    @Column(columnDefinition = "text[]")
    private String[] reasoningForAnswers;

    private String referenceToBook;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Tag> tags;
}
