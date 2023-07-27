package com.github.quizapp.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/tag")
public class TagController {
    @Autowired
    private TagRepository tagRepository;

    @PostMapping
    public TagDTO postTag(@RequestBody TagDTO tagDTO) {
        return TagDTO.Mapper.toDto(tagRepository.save(tagDTO));
    }

    @GetMapping
    public List<TagDTO> getTags() {
        return TagDTO.Mapper.toDto(tagRepository.findAll());
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTag(@RequestBody TagDTO tagDTO) {
        try {
            tagRepository.delete(tagDTO);
            return ResponseEntity.ok("Found and deleted tag with name: " + tagDTO.name());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping
    public ResponseEntity<String> updateTag(@RequestBody String requestBodyString) {
        try {
            var requestBody = new JacksonJsonParser().parseMap(requestBodyString);
            final String name = (String) requestBody.get("name");
            final String newName = (String) requestBody.get("newName");
            var tagSet = tagRepository.findByName(name);
            if (tagSet.size() != 1) {
                return ResponseEntity.badRequest().body("Tag with name [" + name + "] does not exist.");
            }
            if (newName.isBlank()) {
                return ResponseEntity.badRequest().body("Cannot update tag with empty name.");
            }
            var tag = (Tag) tagSet.toArray()[0];
            tag.setName(newName);
            tagRepository.save(tag);
            return ResponseEntity.ok("Updated tag name.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
