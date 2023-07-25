package com.github.quizapp.question.answer;

import com.github.quizapp.question.Question;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "question_id", insertable = false, updatable = false)
    private Question question;

    @Column(columnDefinition = "text", nullable = false)
    private String answer;

    @Column(columnDefinition = "boolean", nullable = false)
    private boolean isCorrect;

    @Column(columnDefinition = "text")
    private String explanation;
}
