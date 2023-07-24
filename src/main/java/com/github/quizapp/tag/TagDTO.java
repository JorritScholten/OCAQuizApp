package com.github.quizapp.tag;

import java.util.List;
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

        public static List<TagDTO> toDto(List<Tag> tags) {
            return tags.stream().map(Mapper::toDto).collect(Collectors.toList());
        }

        public static Tag toTag(TagDTO dto) {
            return new Tag(dto.name);
        }

        public static Set<Tag> toTag(Set<TagDTO> dtos) {
            return dtos.stream().map(Mapper::toTag).collect(Collectors.toSet());
        }
    }
}
