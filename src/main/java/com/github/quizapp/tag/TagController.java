package com.github.quizapp.tag;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<TagDTO> getTags(){
        return TagDTO.Mapper.toDto(tagRepository.findAll());
    }
}
