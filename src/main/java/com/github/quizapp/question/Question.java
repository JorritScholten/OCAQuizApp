package com.github.quizapp.question;

import com.github.quizapp.tag.Tag;
import io.hypersistence.utils.hibernate.type.array.BooleanArrayType;
import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.*;
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
    @GeneratedValue
    private long id;

    private QuestionType type;

    @Column(columnDefinition = "text", nullable = false)
    private String title;

    @Type(StringArrayType.class)
    @Column(columnDefinition = "text[]", nullable = false)
    private String[] possibleAnswers;

    @Type(BooleanArrayType.class)
    @Column(columnDefinition = "boolean[]", nullable = false)
    private boolean[] correctAnswers;

    @Type(StringArrayType.class)
    @Column(columnDefinition = "text[]")
    private String[] reasoningForAnswers;

    @Column(columnDefinition = "text", nullable = false)
    private String referenceToBook;

    @Singular
    @ManyToMany
    private Set<Tag> tags;
}
