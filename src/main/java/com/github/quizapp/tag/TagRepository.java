package com.github.quizapp.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>, TagRepositoryHandleDTO {
    Set<Tag> findByName(String name);
}
