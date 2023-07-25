package com.github.quizapp.tag;

import com.github.quizapp.utility.TextFormatEnforcement;
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
        var allTags = tagRepository.findAll();
        var allTagNames = allTags.stream().map(Tag::getName).toList();
        var findMatch = TextFormatEnforcement.enforceTextFormatting(dto.name(), allTagNames);
        if (findMatch.isEmpty()) {
            return tagRepository.save(new Tag(dto.name().toLowerCase()));
        } else {
            // findAny() can be called because the Tag name should be unique
            return tagRepository.findByName(findMatch.get()).stream().findAny().orElseThrow();
        }
    }

    @Override
    public List<Tag> saveAll(Set<TagDTO> dtos) {
        return dtos.stream().map(this::save).collect(Collectors.toList());
    }
}
