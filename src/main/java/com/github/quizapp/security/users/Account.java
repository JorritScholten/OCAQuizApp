package com.github.quizapp.security.users;


import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "access",discriminatorType = DiscriminatorType.STRING)
public abstract class Account {
    // TODO: 19/07/2023

    @GeneratedValue
    @Id
    private  long id;
    private String name;
    private String displayName;
    private String password;

    public Account(String name, String displayName, String password) {
        this.name = name;
        this.displayName = displayName;
        this.password = password;
    }
    public Account(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
