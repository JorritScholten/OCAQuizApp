package com.github.quizapp.tag;

import java.util.List;
import java.util.Set;

public interface TagRepositoryHandleDTO {
    Tag save(TagDTO dto);

    List<Tag> saveAll(Set<TagDTO> dtos);
}
