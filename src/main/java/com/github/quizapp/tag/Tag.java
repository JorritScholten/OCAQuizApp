package com.github.quizapp.tag;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue
    private long id;

    @Setter
    @Column(nullable = false, unique = true, columnDefinition = "text")
    private String name;

    public Tag(String name) {
        this.name = name;
    }
}
