package com.github.quizapp.tag;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false, unique = true, columnDefinition = "text")
    private String name;

    public Tag(String name) {
        this.name = name;
    }
}
