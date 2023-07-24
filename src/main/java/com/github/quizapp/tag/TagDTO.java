package com.github.quizapp.tag;

import java.util.Set;
import java.util.stream.Collectors;

public record TagDTO(String name) {
    public static class Mapper {
        public static TagDTO toDto(Tag tag) {
            return new TagDTO(tag.getName());
        }

        public static Set<TagDTO> toDto(Set<Tag> tags) {
            return tags.stream().map(Mapper::toDto).collect(Collectors.toSet());
        }
    }
}
