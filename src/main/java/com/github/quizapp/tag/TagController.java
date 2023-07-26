package com.github.quizapp.tag;

import org.springframework.beans.factory.annotation.Autowired;
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
}
