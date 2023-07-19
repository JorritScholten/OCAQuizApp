package com.github.quizapp.security.users;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("USER")
public class User extends Account{
    // TODO: 19/07/2023 wait for implementation of domain to add created questions, created tags, completer quizzes
}
