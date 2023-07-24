package com.github.quizapp.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class TagRepositoryHandleDTOImpl implements TagRepositoryHandleDTO {
    @Autowired
    @Lazy
    private TagRepository tagRepository;

    @Override
    public Tag save(TagDTO dto) {
        var tag = TagDTO.Mapper.toTag(dto);
        if (tagRepository.findByName(tag.getName()).isEmpty()) {
            return tagRepository.save(tag);
        } else {
            // findAny() can be called because the Tag name should be unique
            return tagRepository.findByName(tag.getName()).stream().findAny().orElseThrow();
        }
    }

    @Override
    public List<Tag> saveAll(Set<TagDTO> dtos) {
        return dtos.stream().map(this::save).collect(Collectors.toList());
    }
}
